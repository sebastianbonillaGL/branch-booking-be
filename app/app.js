const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

require('./api/auth/passportSetup');

mongoose.connect(
    config.db.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);
// mongoose.connect('mongodb+srv://bonsebas:l31dyJ*.@branch-booking-1prnm.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

let app = express();
require('./middleware/appMiddleware')(app);

app.use(express.static('./../public'));
app.use('/api', require('./api/apiRouter'));

app.use((error, request, response, next) => {
    console.log(error);
    response.status(422).send({ error: error.message });
})

module.exports = app;