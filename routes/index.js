const express = require('express');
const services = require('../controller/index');
const router = express.Router();
const secured = require('../auth/jwt');

// routes
router.post('/login', authenticate);
router.post('/user', createUser);
router.post('/loans',secured, applyLoan);
router.get('/loans', secured, availableLoan);


module.exports = router;

function createUser(req, res, next){
	services.createUser(req.body)
		.then(user => res.json({message:'user created successfully', user}))
		.catch(err => res.status(400).json({message: err.message}));
};

function authenticate(req, res, next){
	services.authenticate(req.body)
		.then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
		.catch(err => next(err));
}

function availableLoan(req, res, next){
	services.availableLoan()
		.then(loans => res.json(loans))
		.catch(err => next(err));
}

function applyLoan(req, res, next){
	
	services.applyLoan(req.body)
		.then(loanApplication => res.json(loanApplication))
		.catch(err => next(err));
}
