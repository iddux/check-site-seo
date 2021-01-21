const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const handleAsync = require('./../utils/handleAsync');
const User = require('./../models/UserModel');
const {GeneralError, NotAuthenticated} = require('../utils/handleErrors');

const refreshTokens = [];

exports.signUp = handleAsync(async (req, res, next) => {
    const user = await User.findOne({
        $or: [
            {username: req.body.username},
            {email: req.body.email},
        ]
    });

    if (user.email.toLowerCase() === req.body.email.toLowerCase()) {
        throw new GeneralError('User with this email already exists');
    }

    if (user.username.toLowerCase() === req.body.username.toLowerCase()) {
        throw new GeneralError('User with this username already exists');

    }

    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });


    res.status((200)).json({
        'status': 'success',
         data: true,
    });
});

exports.getToken = handleAsync( async (req, res, next) => {
    const refreshToken = req.body.token;

    console.log(refreshTokens);
    if (!refreshTokens.includes(refreshToken)) throw new NotAuthenticated('Not Authenticated');

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      console.log('sdasd');
        if (err) throw new NotAuthenticated('Refresh token is expired');
        const accessToken = generateAccessToken({name: user.name});
        res.json({accessToken});
    })
});

exports.login = handleAsync(async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({email: email});

    if (!user) {
        throw new GeneralError('User with this email not exists');
    }

    const userInfo = {
        _id: user._id,
        username: user.username,
        email: user.email
    }

    const matchPassword = await bcrypt.compare(req.body.password, user.password);

    if (matchPassword) {
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: 120,
        });
        refreshTokens.push(refreshToken)

        res.header("authorization", accessToken).json({
            accessToken: accessToken, refreshToken: refreshToken, user: userInfo
        })
    } else {
        throw new GeneralError('Incorrect Password');
    }
});

// helper methods
generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 10,
    })
}

