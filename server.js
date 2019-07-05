const app = require('./app');

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.listen(port, function(){ console.log(`Server listening on port ${port}`);});
