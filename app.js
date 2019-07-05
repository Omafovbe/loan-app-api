const express = require('express'); 
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const loan = require('./routes/index.js');
//const jwt = require('./auth/jwt');
const config = require('./config.json');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

function customErrorMsg(err, req, res, next) {
	if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

//API Routes
app.use('/api', loan);


//Use custom Error
app.use(customErrorMsg);

module.exports = app;

