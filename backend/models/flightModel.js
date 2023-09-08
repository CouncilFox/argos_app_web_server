import mongoose from 'mongoose';

const flightSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    aircraft: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    stopTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
