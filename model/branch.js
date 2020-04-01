const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    code:{
        type: Number,
        required: [true, 'field Number is required'],
        unique: [true, 'this branch already exist']
    },
    left:{
        type: Number
    },
    right:{
        type: Number
    },
    front:{
        type: Number
    }
});

const Branch = mongoose.model('branch', BranchSchema);

module.exports = Branch;