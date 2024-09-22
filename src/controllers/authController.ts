import { Context } from 'koa';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { RequestBody } from '../interfaces/requestBody';
import { User } from '../models/user'; 
import { AppDataSource } from '../orm/ormconfig';
import dotenv from 'dotenv';

dotenv.config();

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
  ClientId: process.env.COGNITO_CLIENT_ID || "",
};

if (poolData.UserPoolId === "" || poolData.ClientId === "") {
    throw new Error("COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID must be defined in the environment variables.");
}

const userPool = new CognitoUserPool(poolData);

const confirmUser = async (cognitoUser: CognitoUser, confirm_code: string, ctx: Context) => {
  return new Promise<void>((resolve) => {
    cognitoUser.confirmRegistration(confirm_code, true, (err) => {
      if (err) {
        ctx.status = 500;
        ctx.body = { message: 'Error confirming email.', error: err };
      } else {
        ctx.status = 200;
        ctx.body = { message: 'Email confirmed successfully.' };
      }
      resolve();
    });
  });
};

const loginUser = async (cognitoUser: CognitoUser, password: string, confirm_password:string | null, ctx: Context) => {
  return new Promise<void>((resolve) => {
    cognitoUser.authenticateUser(new AuthenticationDetails({ Username: cognitoUser.getUsername(), Password: password }), {
      onSuccess: (result) => {
        ctx.status = 200;
        ctx.body = { message: 'User authenticated successfully.', token: result.getAccessToken().getJwtToken() };
        resolve();
      },
      onFailure: async (err) => {
        if (err.code === 'NotAuthorizedException' && confirm_password) { 
          ctx.status = 400;
          if (password != confirm_password){
            ctx.body = {message: 'Register failed: Password and confirmation must be equal'};
            resolve();
          }else{
            await handleSignUp(cognitoUser, password, ctx);
            resolve();
          }
        } else if (err.code === "NotAuthorizedException") {
          ctx.status = 400;
          ctx.body = { message: 'User or Password are wrong' };
          resolve();
        } else if (err.code === "UserNotConfirmedException") {
          ctx.status = 400;
          ctx.body = { message: 'Please confirm the email' };
          resolve();
        } else {
          ctx.status = 500;
          ctx.body = { message: 'Authentication failed.', error: err };
          resolve();
        }
      }
    });
  });
};

const handleSignUp = async (cognitoUser: CognitoUser, password: string, ctx: Context) => {
  const { email } = ctx.request.body as RequestBody;
  const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];

  return new Promise<void>((resolve) => {
    userPool.signUp(email, password, attributeList, [], async (signUpErr, signUpResult) => {
      //console.log(signUpResult);
      if (signUpErr) {
        ctx.status = 500;
        ctx.body = { message: 'Error signing up.', error: signUpErr };
      } else if (signUpResult) {
        await saveUserToDatabase(signUpResult.userSub, email, ctx);
      } else {
        ctx.status = 500;
        ctx.body = { message: 'Sign-up failed: No result returned.' };
      }
      resolve();
    });
  });
};

const saveUserToDatabase = async (cognitoUser: string, email: string, ctx: Context) => {
  const newUser = new User();
  newUser.cognitoId = cognitoUser;
  newUser.email = email;
  newUser.role = 'user';
  newUser.isOnboarded = false;
  newUser.createdAt = new Date();
  newUser.updatedAt = new Date();

  try {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(newUser);
    ctx.status = 201;
    ctx.body = { message: 'User registered successfully, please confirm the email.' };
  } catch (dbError) {
    ctx.status = 500;
    ctx.body = { message: 'Error saving user to database.', error: dbError };
  }
};

export const signInOrRegister = async (ctx: Context) => {
  const { password, confirm_code, confirm_password, email } = ctx.request.body as RequestBody;

  if (!email || (!password && !confirm_code)) {
    ctx.status = 400;
    ctx.body = { message: "Must send some param" };
    return;
  }

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  if (confirm_code) {
    await confirmUser(cognitoUser, confirm_code, ctx);
  } else {
    await loginUser(cognitoUser, password, confirm_password, ctx);
  }
};