const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, 'field Number is required'],
        unique: true
    },
    name:{
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;