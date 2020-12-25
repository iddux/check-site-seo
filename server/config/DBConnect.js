const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME

const connectionOptions = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

module.exports = () => {
    mongoose.connect(`${url}/${dbName}?authSource=admin`, connectionOptions);
    mongoose.connection.on('connected', function () {
        console.log('connection_successful');
    });
}
