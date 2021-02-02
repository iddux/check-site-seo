const express = require('express');
const authController = require('./../controllers/authController');
const {handleParamsErrors} = require('./../middlewares/middlewares');
const router = express.Router();

const signUpParams = {
    username: 'string',
    email: 'string',
    password: 'string',
    confirmPassword: 'string',
}

const loginParams = {
    email: 'string',
    password: 'string',
}

const tokenParam = {
    token: 'string',
}


router.post('/signup', handleParamsErrors(signUpParams), authController.signUp);
router.post('/login', handleParamsErrors(loginParams), authController.login);
router.post('/token', handleParamsErrors(tokenParam), authController.getToken);

module.exports = router;
