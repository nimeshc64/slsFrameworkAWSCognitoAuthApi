/**
 * Created by IntelliJ IDEA.
 * User: Nimesh.Chathurange
 * Date: 10/03/2020
 */
'use strict';

const signUpHandler = require('./SignUpHandler');

exports.handler = (ev, ctx, cb => {
    try {
        console.log('signUpHandler-EVENT\n', JSON.stringify(ev));
        signUpHandler.userSignUp(ev, cb);
    } catch (e) {
        console.error('signUpHandler-SignUp-Exception', e);
        cb(new Error('signUpHandler-SignUp-Exception'));
    }
});
