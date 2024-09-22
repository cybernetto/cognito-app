import { Context } from 'koa';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { RequestBody } from '../interfaces/requestBody';
import { User } from '../models/user'; 
//import { getRepository } from 'typeorm';
import { AppDataSource } from '../orm/ormconfig'

const poolData = {
  UserPoolId: "us-east-2_nITAHCIv0",
  ClientId: "7kolr3304oibqonak39c5hd1mj"
};

const userPool = new CognitoUserPool(poolData);

export const signInOrRegister = async (ctx: Context) => {
  const { password, confirm_password, confirm_code, email } = ctx.request.body as RequestBody;

  if (!password && !confirm_code && !confirm_password && !email) {
    ctx.status = 400;
    ctx.body = { message: "Must send some param" };
    return;
  }

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  await new Promise<void>((resolve, reject) => {
    if (confirm_code) {
      cognitoUser.confirmRegistration(confirm_code, true, (err) => {
        if (err) {
          console.log('Error confirming email:', err);
          ctx.status = 500;
          ctx.body = { message: 'Error confirming email.', error: err };
          resolve();
        } else {
          ctx.status = 200;
          ctx.body = { message: 'Email confirmed successfully.' };
          resolve();
        }
      });
    } else {
      cognitoUser.authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
        onSuccess: async (result) => {
          ctx.status = 200;
          ctx.body = { message: 'User authenticated successfully.', token: result.getAccessToken().getJwtToken() };
          resolve();
        },
        onFailure: async (err) => {
          if (err.code === 'NotAuthorizedException') {
            if (confirm_password) {
              const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })];

              userPool.signUp(email, password, attributeList, [], async (signUpErr, signUpResult) => {
                if (signUpErr) {
                  ctx.status = 500;
                  ctx.body = { message: 'Error signing up.', error: signUpErr };
                  reject();
                } else if (signUpResult) { // Verifique se signUpResult não é undefined
                  const cognitoUser = signUpResult.user;
                  console.log('User registered successfully:', cognitoUser.getUsername());
              
                  const newUser = new User();
                  newUser.cognitoId = cognitoUser.getUsername();
                  newUser.email = email;
                  newUser.role = 'user';
                  newUser.isOnboarded = false;
                  newUser.createdAt = new Date();
                  newUser.updatedAt = new Date();
                  
              
                  try {
                    //debugger;
                    const userRepository = AppDataSource.getRepository(User);
                    await userRepository.save(newUser);
                    ctx.status = 201;
                    ctx.body = { message: 'User registered successfully, please confirm the email.' };
                    resolve();
                  } catch (dbError) {
                    console.log('Error saving user to database:', dbError);
                    ctx.status = 500;
                    ctx.body = { message: 'Error saving user to database.', error: dbError };
                    reject();
                  }
                } else {
                  ctx.status = 500;
                  ctx.body = { message: 'Sign-up failed: No result returned.' };
                  reject();
                }
              });
              
            } else {
              ctx.status = 500;
              ctx.body = { message: "User or password incorrect" };
              resolve();
            }
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
    }
  });
};
