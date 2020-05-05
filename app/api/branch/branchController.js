const Branch = require('./branch');

exports.get = function(request, response, next) {
    Branch.find()
    .populate('neighbors')
    .exec()
    .then((data) => {
        response.json(data);
    })
    .catch(next);
}

exports.post = function (request, response, next) {
    Branch.create(request.body)
        .then(updateNeighbors)
        .then(function (result) {
            response.json(result);
        })
        .catch(next);
}

let updateNeighbors = (branch) => {
    let promises = branch.neighbors.map(function (neighbor) {
        return findAndUpdate(neighbor, branch._id)
    })
    return Promise.all(promises);
}

let findAndUpdate = function (branchId, neighborId) {
    return new Promise(function (resolve, reject) {
        Branch.findById(branchId, function (err, branch) {
            if (err) { return reject(err); }
            branch.neighbors.push(neighborId);
            branch.save(function (err, item) {
                return err ? reject(err) : resolve(item);
            });
        });
    });
}

