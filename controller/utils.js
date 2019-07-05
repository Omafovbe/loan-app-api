module.exports = {
 user_model : {
	firstname: '',
	lastname: '',
	hash_password: '',
	phone: '',
	email: '',
	address: '',
	state: '',
	country: '',
},

loanApply_model: {
	loanId: '',
	loanName: '',
	amount: '',
	userId: '',
	date_applied: '',
	loan_date_start: '',
	loan_date_end: '',
},

users: [],

loanApplied: [],

 loanData : [
	{
		id: 1,
		name: 'Ren Money',
		description: 'Salary earners discounted loan',
		interest_rate: '3%',
		amount: 50000.00,
		tenure: '18 months'
	},
	{
		id: 2,
		name: 'Kia Kia',
		description: 'Easy small loan',
		interest_rate: '5%',
		amount: 5000.00,
		tenure: '3 months'
	}
]
};