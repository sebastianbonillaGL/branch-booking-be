const Branch = require('../model/branch');

module.exports = function(router){
    router.post('/branch', (request, response, next) => {
        Branch.create(request.body).then((data) => {
            updateNeighbors(data);
            response.json(data);
        }).catch(next);
    });

    router.get('/branch', (request, response, next) => {
        Branch.find().then((data) => {
            response.json(data);
        }).catch(next);
    });
}

let updateNeighbors = (branch) => {
    updatefrontNeighbor(branch);
    updateLeftNeighbor(branch);
    updateRightNeighbor(branch)
}

let updateRightNeighbor = (branch) => {
    console.log('updating right neighbor');
    Branch.findOneAndUpdate({code:branch.left}, {code: branch.left, right: branch.code}).then((data) => {
        console.log(data);
    });
}

let updateLeftNeighbor = (branch) => {
    console.log('updating left neighbor');
    Branch.findOneAndUpdate({code:branch.right}, {code: branch.right, left: branch.code}).then((data) => {
        console.log(data);
    });
}

let updatefrontNeighbor = (branch) => {
    console.log('updating front neighbor');
    Branch.findOneAndUpdate({code:branch.front}, {code: branch.front, front: branch.code}).then((data) => {
        console.log(data);
    });
}

