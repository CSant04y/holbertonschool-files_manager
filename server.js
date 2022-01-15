import express from 'express';
const app = express();
const port = 5000;
const routes = require('./routes');

app.use('/', routes);

app.listen(port, () => console.log('App listening on port 5000'));
