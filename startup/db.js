const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

module.exports = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/vidly')
        .then(() => winston.info('Connected to mongo'))
        .catch((err) => winston.info('Error'))
}