const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
    date: Date,
    checkIn: Date,
    checkOut: Date
});

ReservationSchema.pre('save', function(next) {
    let weekDay = this.date.getDay()
    if (weekDay === 6 || weekDay === 0){
        return next(Error("Invalid date: is a weekend"));
    }
    next()
})

module.exports = mongoose.model('reservation', ReservationSchema);
