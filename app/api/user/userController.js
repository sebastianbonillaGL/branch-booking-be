const User = require('../model/user');

module.exports = function(router){
    router.post('/login', (request, response, next) => {
        Branch.find({ email: request.body.email }).then((data) => {
            response.json(data);
        }).catch(next);
    });

    router.post('/register', (request, response, next) => {
        User.create(request.body).then((data) => {
            response.json(data);
        }).catch(next);
    });
}
