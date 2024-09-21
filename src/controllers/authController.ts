import { Context } from 'koa';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { RequestBody } from '../interfaces/requestBody';

const poolData = {
  UserPoolId: "us-east-2_nITAHCIv0",
  ClientId: "7kolr3304oibqonak39c5hd1mj"
};

const userPool = new CognitoUserPool(poolData);

// Função para autenticar ou registrar o usuário
export const signInOrRegister = async (ctx: Context) => {
  // Captura os parâmetros do corpo da requisição
  const { password, confirm_password, confirm_code, email } = ctx.request.body as RequestBody;

  //parser
  if (password || confirm_code || confirm_password || email){
    if (confirm_code && !password){
        ctx.status = 400; // Bad Request
        ctx.body = { message: '"Email" and "password" still required to confirm account'}
        return;

        } else if (confirm_code && confirm_password){
        ctx.status = 500;
        ctx.body = {message:"confirm_code and confirm_password are used to diferent purposes."};
        return;
    }
  }else{
        ctx.status = 500;
        ctx.body = {message:"Must send some param"};
        return;
  } 
    
 

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  //usa uma promisse para aguardar o resultado.
  await new Promise<void>((resolve,reject) => {
    if (confirm_code){
    cognitoUser.confirmRegistration(confirm_code, true, (err, result) => {
        if (err) {
          console.log('Error confirming email:', err);
          ctx.status = 500; // Internal Server Error
          ctx.body = { message: 'Error confirming email.', error: err };
          resolve();
        } else {
          console.log('Email confirmed successfully:', result);
          ctx.status = 200; // OK
          ctx.body = { message: 'Email confirmed successfully.' };
          resolve();
        }
    });
    }else{
        // Tentar autenticar o usuário
        cognitoUser.authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {

            onSuccess: (result) => {
            console.log('User authenticated successfully:', result);
            ctx.status = 200; // OK
            ctx.body = {
                message: 'User authenticated successfully.', 
                token: result.getAccessToken().getJwtToken() 
            };
            resolve();
            },


            newPasswordRequired: function(userAttributes, requiredAttributes) {
            // User was signed up by an admin and must provide new
            // password and required attributes, if any, to complete
            // authentication.
            // the api doesn't accept this field back
            delete userAttributes.email_verified;

            // store userAttributes on global variable
            // console.log( userAttributes );
            ctx.body = { message: 'User created by admin must set a new password' };
            resolve();
            },


            onFailure: (err) => {
            console.log("Error: " + err.code);
            if (err.code === 'NotAuthorizedException'){
                //console.log("entreii");
                if (confirm_password) {
                    // O usuário não existse, então vamos registrá-lo
                    const attributeList = [];
                    const dataEmail = {
                    Name: 'email',
                    Value: email
                    };

                    const attributeEmail = new CognitoUserAttribute(dataEmail);
                    attributeList.push(attributeEmail);

                    userPool.signUp(email, password, attributeList, [], (signUpErr, signUpResult) => {
                        if (signUpErr) {
                        console.log('Error signing up:', signUpErr);
                        ctx.status = 500; // Internal Server Error
                        ctx.body = { message: 'Error signing up.', error: signUpErr };
                        reject();
                        }
            
                        if (signUpResult) {
                        const cognitoUser = signUpResult.user;
                        console.log('User registered successfully:', cognitoUser.getUsername());
                        ctx.status = 201; // Created
                        ctx.body = { message: 'User registered successfully, please confirm the email.' };
                        resolve();
                        } else {
                        ctx.status = 500; // Internal Server Error
                        ctx.body = { message: 'Sign-up failed: No result returned.' };
                        reject();
                        }
                    });
                } else{
                    ctx.status = 500;
                    ctx.body = {message:"User or password incorrect"};
                    resolve();
                }
            } else if (err.code === "UserNotConfirmedException"){
                ctx.status = 400; 
                ctx.body = { message: 'Please confirm the email' };
                resolve();

            } else {
                console.log('Authentication failed:', err);
                ctx.status = 500;
                ctx.body = { message: 'Authentication failed.', error: err };
                resolve();
            } 
            }
        })}
    }
);
};
