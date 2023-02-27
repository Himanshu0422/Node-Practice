const { Rental, schema } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require("fawn");
const express = require('express');
const router = express.Router();

Fawn.init('mongodb://127.0.0.1:27017/vidly');

router.get('/', async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut');
	res.send(rentals);
});

router.post('/', async (req, res) => {
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// if(mongoose.Types.ObjectId.isValid(req.body.customerId)){
	// 	return res.status(400).send('Invalid Id');
	// }
	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send('Invalid customer.');

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send('Invalid movie.');

	if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	});
	rental = await rental.save();

	movie.numberInStock--;
	movie.save();
	res.send(rental);
	// try {
	// 	new Fawn.Task()
	// 		.save('rentals', rental)
	// 		.update('moives', { _id: movie._id }, {
	// 			$inc: { numberInStock: -1 }
	// 		})
	// 		.run();
	// 		res.send(rental);
	// }catch{
	// 	res.status(500).send('Something Failed');
	// }

});

router.get('/:id', async (req, res) => {
	const rental = await Rental.findById(req.params.id);

	if (!rental) return res.status(404).send('The rental with the given ID was not found.');

	res.send(rental);
});

module.exports = router; 