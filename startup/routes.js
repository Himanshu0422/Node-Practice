const express = require('express');
const genres = require('../routes2/genres');
const customers = require('../routes2/customers');
const home = require('../routes2/home');
const movies = require('../routes2/movies');
const rentals = require('../routes2/rentals');
const users = require('../routes2/users');
const auth = require('../routes2/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres/', genres);
    app.use('/api/customers/', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/', home);
    app.use(error);
}