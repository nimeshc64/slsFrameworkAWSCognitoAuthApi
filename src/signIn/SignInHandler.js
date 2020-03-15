/**
 * Created by IntelliJ IDEA.
 * User: Nimesh.Chathurange
 * Date: 15/03/2020
 */
'use strict';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

class signInHandler {
    static signIn(event, callback) {
        let body = JSON.parse(event.body);
        let response = '';

        let email = body.email;
        let password = body.password;

        var authenticationData = {
            Username: email,
            Password: password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId: config.COGNITO_USER_POOL_ID,
            ClientId: config.COGNITO_USER_CLIENT_ID
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username: email,
            Pool: userPool
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                response = {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify({
                        status: 200,
                        data: {
                            accessToken: result.getAccessToken().getJwtToken(),
                            idToken: result.getIdToken().getJwtToken(),
                            refreshToken: result.getRefreshToken().getToken()
                        }
                    })
                };
                callback(null, response);
            },

            onFailure: function (err) {
                response = {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify({
                        status: 400,
                        data: err
                    })
                };
                callback(null, response);
            }
        });

    }
}

module.exports = signInHandler;
