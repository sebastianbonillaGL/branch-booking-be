const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

require('./api/auth/passportSetup');

console.log(config.MONGODB_URI);
mongoose.connect(
    config.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

let app = express();
require('./middleware/appMiddleware')(app);

app.use(express.static('./../public'));
app.use('/api', require('./api/apiRouter'));

app.use((error, request, response, next) => {
    console.log(error);
    response.status(422).send({ error: error.message });
})

module.exports = app;