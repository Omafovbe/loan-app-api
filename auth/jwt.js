const jwt = require('jsonwebtoken');
const config = require('../config.json');
const services = require('../controller/index');

module.exports = protectedRoute;

//Function to authenticate routes


function protectedRoute (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer:') {
        const authHeader = req.headers.authorization.split(' ')[1];
        const token = jwt.verify(authHeader, config.secret);
        return next();
    } else if (req.query && req.query.token) {
      const authQuery = req.query.token;
      const token = jwt.verify(authQuery, config.secret);
        return next();
    }

    return res.status(401).json({message: 'Unauthorizated'});
  };