const request = require('supertest');
const app = require('../app');
const config = require('../config.json');
const utils = require('../controller/utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let auth = {};

// Call this function before each test to: so as to get auth token
beforeEach(async () => {
	const hash_password = await bcrypt.hashSync('secret_text', config.salts);
		const user_model = {
			firstname: 'John',
			lastname: 'Doe',
			phone: '08022443311',
			email: 'me@test.com',
			address: '7 lagos rd',
			state: 'Delta',
			country: 'Nigeria',
			hash_password: hash_password,
		};

		utils.users.push(user_model);

		//Login to get auth token
		const response = await request(app)
			.post('/api/login')
			.send({
				email: 'me@test.com',
				password: 'secret_text'
			});

		// Assign auth token from response
		auth.token = response.body.token;
		auth.current_userId = jwt.decode(auth.token).sub;
});

describe('GET api/loans without auth', () => {
	test('requires login', async () => {
		const response = await request(app).get('/api/loans/');
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe('UnauthorizedError');
	})
});

describe('GET api/loans', () => {
	test('returns list of available loans', async () => {
		const response = await request(app)
			.get('/api/loans')
			.set('authorization', 'Bearer: '+ auth.token);
		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBe(2);
	})
});

describe('POST api/loans', () => {
	test('add a loan application', async () => {
		const response = await request(app)
			.post('/api/loans')
			.set('authorization', 'Bearer: '+ auth.token)
			.send({
				loanId: 1,
				loanName: 'Kia Kia',
				amount: 5000,
				userId: auth.current_userId,
				date_applied: Date.now(),
				loan_date_start: '5-3-19', //Date in mm-dd-yy
				loan_date_end: '8-4-19',
			});
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Application successful');
	})
});