const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// const routes = require('./routes/index');
require('./routes/index')(app);

app.listen(port, () => console.log('App listening on port 5000'));
