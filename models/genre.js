const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

const schema = Joi.object({
    name: Joi.string().min(3).required()
});

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.schema = schema;