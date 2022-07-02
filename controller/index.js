const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const utils = require('./utils.js');
//Define our data
let id = 0;

module.exports = {
	createUser,
	authenticate,
	getById,
	applyLoan,
	availableLoan,
};

async function createUser(reqParam){
	
	//Checks if a user exist with the email
	const user = await utils.users.find(u => u.email === reqParam.email );

	if(user){
		throw ({message: `User with email: ${reqParam.email} exist`});
	} else {
		//increment ID
		id += 1;

		//Hash the password of user
		passwordHash = bcrypt.hashSync(reqParam.password, config.salts);

		//Assign the data with the hashed password to user_model
		Object.assign(utils.user_model, reqParam);

		//Save the user bio-data
		utils.users.push({id, ...reqParam, hash_password: passwordHash});
		
		//Extract user without the password and hash_password
		const {hash_password, password, ...userWithoutPassword} = utils.user_model;
		
		//return user with ID
		return {id, ...userWithoutPassword};
	}
};

// Authenticate user during logins
async function authenticate({email, password}){
	//find user with email and compare password
	const user = await utils.users.find(user => user.email === email && bcrypt.compareSync(password, user.hash_password));

	//if user exist, sign user and create a token with JWT
	if(user) {
		const {hash_password, ...userWithoutPassword} = user;
		const token = jwt.sign({sub: user.id}, config.secret, {expiresIn: '5h'});
		return { ...userWithoutPassword, token };
	}
};

//Gets the user by id used for authentication
async function getById(id) {
	console.log(id);
    return await utils.users.find(user => user.id === id);

};

//Display all available loans
async function availableLoan(){
	return await utils.loanData;
};

//Application for loan
async function applyLoan(reqParam) {
	const appliedLoans = await utils.loanApplied.filter(loan => loan.userId === reqParam.userId)
							.map(loans => stillRunning = compareDate(reqParam.loan_date_start, loans.loan_date_start, loans.loan_date_end))
							.reduce((acc, val) => acc || val, false);
	console.log(appliedLoans);

	if(appliedLoans)
	{
		return {message: "Sorry you are not allow to apply for loan within the "}
	} else {
		
		utils.loanApplied.push({...reqParam, date_applied: Date.now()});
		utils.loanApply_model = [];
		
		const allAppliedLoans = await utils.loanApplied.filter(loan => loan.userId === reqParam.userId)
		
		return {message: "Application successful", allAppliedLoans }
	};
	
	
}
 //Function to compare current loan application date to other loans applied for
function compareDate(current_startdate, prev_startDate, prev_endDate) {
	//Date should be in mm-dd-yy
	current_startdate = new Date(current_startdate);
	prev_startDate = new Date(prev_startDate);
	prev_endDate = new Date(prev_endDate);
	return prev_startDate <= current_startdate && current_startdate <= prev_endDate
}
