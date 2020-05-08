const Branch = require('./branch');
const lodash = require('lodash');

exports.checkBranch = function () {
    return function (req, res, next) {
        let id = req.query.id;
        Branch.findById(id)
            .then(function (branch) {
                if (!branch) {
                    next(Error('No branch with that id'));
                } else {
                    req.branch = branch;
                    next();
                }
            })
            .catch(next)
    }
}

exports.get = function (request, response, next) {
    Branch.find()
        .populate('neighbors')
        .exec()
        .then((data) => {
            response.json(data);
        })
        .catch(next);
}

exports.post = function (request, response, next) {
    console.log(request.body);
    Branch.create(request.body)
        .then(function(branch){
            updateNeighbors(branch)
            .then(function(_){
                response.json(branch);
            })
        })
        .catch(next);
}

exports.put = function (request, response, next) {
    let branch = request.branch;
    var update = request.body;

    lodash.mergeWith(branch, update, function(obj, src){
        if(lodash.isArray(obj)){
            return src;
        }
    });

    branch.save(function (err, saved) {
        if (err) {
            next(err);
        } else {
            updateNeighbors(saved)
            .then(function(_){
                response.json(saved);
            })
        }
    });
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

