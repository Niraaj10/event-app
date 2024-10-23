import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['attendee', 'organizer', 'admin'],
        default: 'attendee',
    },
    profilePicture: {
        type: String, //cloudinary url
    },
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    history: [{
        event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        bookedAt: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },  // Mark whether user attended the event
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);