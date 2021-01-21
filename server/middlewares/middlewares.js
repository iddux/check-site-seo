const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const { GeneralError, NotAuthenticated} = require('../utils/handleErrors');


module.exports = {
    authenticate: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) throw new NotAuthenticated('Not authenticated')
            req.user = user;
            next();
        })
    },
    handleGeneralErrors: (err, req, res, next) => {
        if (err instanceof GeneralError) {
            return res.status(err.getCode()).json({
                status: 'error',
                message: err.message,
            });
        }

        if(err.code === 11000) {
            return res.status(500).json({
                status: 'error',
                message: `Duplicated field value: ${Object.keys(err.keyPattern)[0]}`,
            })
        }

        return res.status(500).json({
            status: 'error',
            message: err.message,
        });
    },
    handleParamsErrors: function (params) {
        return function(req, res, next) {
            let isErrorHappened = false;
            Object.keys(params).forEach(param => {
                if(req.body[param] === null || req.body[param] === undefined) {
                    isErrorHappened = true;

                    return res.status(500).json({
                        status: 'error',
                        message: `Missing Parameter`,
                        param: param,
                    })
                } else if(typeof req.body[param] !== params[param]) {
                    isErrorHappened = true;

                    return res.status(500).json({
                        status: 'error',
                        message: 'Invalid type',
                        param: params[param],
                    })
                }
            });
            if(!isErrorHappened) next();
        }
    }
}
