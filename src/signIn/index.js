/**
 * Created by IntelliJ IDEA.
 * User: Nimesh.Chathurange
 * Date: 15/03/2020
 */
'use strict';

const signInHandler = require('./SignInHandler');

exports.handler = (event, context, callback) => {
    try {
        console.log('SignInHandler-EVENT \n',JSON.stringify(event));
        signInHandler.signIn(event,callback);
    } catch (error) {
        console.error('SignHandler-SignIn-Exception', error);
        callback(new Error('something went wrong signIn'));
    }
};