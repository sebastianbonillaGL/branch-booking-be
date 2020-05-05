const config = require('./app/config/config');
const app = require('./app/app');

app.listen(config.port, function(){
    console.log("listening on port: " + config.port);
});