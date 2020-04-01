let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/branch-booking');
mongoose.connect('mongodb+srv://bonsebas:l31dyJ*.@branch-booking-1prnm.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
// mongoose.Promise = global.Promise;

let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api/v1', require('./routes/apiRouter'));
app.use((error, request, response, next) => {
    console.log(error);
    response.status(422).send({error: error.message});
})

app.listen(process.env.port || 3000);