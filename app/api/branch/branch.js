const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    neighbors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'branch'
        }
    ]
});

const Branch = mongoose.model('branch', BranchSchema);

module.exports = Branch;