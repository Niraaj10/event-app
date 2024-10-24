import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],
    history: [{
        event: { type: Schema.Types.ObjectId, ref: 'Event' },
        bookedAt: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },  // Mark whether user attended the event
    }],
}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);