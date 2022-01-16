const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// const routes = require('./routes/index');
app.use(express.json());
require('./routes/index')(app);

app.listen(port, () => console.log('App listening on port 5000'));
