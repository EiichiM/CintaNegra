const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateInit: {
        type: Date,
        required: true
    },
    location: {
        type: {
            type: String,
            enum:['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;