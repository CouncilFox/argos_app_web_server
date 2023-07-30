import mongoose from 'mongoose';

const userActivitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    actionType: {
        type: String,
        required: true,
    },
    page: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;
