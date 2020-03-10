/**
 * Created by IntelliJ IDEA.
 * User: Nimesh.Chathurange
 * Date: 10/03/2020
 */
'use strict';

global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

//TODO: create global config
const poolData = {
    UserPoolId: config.COGNITO_USER_POOL_ID,
    ClientId: config.COGNITO_USER_CLIENT_ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

class signUpHandler {
    static userSignUp(event, callback) {
        let body = JSON.parse(event.body);
        let headers = event.headers;
        let response = '';
        var attributeList = [];

        console.log('signUpHandler-request-BODY', body);
        console.log('signUpHandler-request-HEADER', headers);

        var emailAddress = body.email ? body.email : '';
        var fName = body.fname ? body.fname : '';
        var lname = body.lname ? body.lname : '';
        var password = body.password ? body.password : '';


        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'given_name',
            Value: fName
        }));

        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'family_name',
            Value: lname
        }));

        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: emailAddress
        }));

        userPool.signUp(emailAddress, password, attributeList, null, function (err, result) {
            if (err) {
                console.log('signUpHandler-cognitoSignup-ERROR', err);
            } else {
                console.log('signUpHandler-cognitoSignup-RESULT', result);
                var cognitoUser = result.user;
            }
        });
    }
}

module.exports = signUpHandler;