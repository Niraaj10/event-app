import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Refers to the event organizer
        required: true,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    categories: [{
        type: String,
    }],
    ticketPrice: {
        type: Number,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    qrCode: {  // This is generated during ticket booking
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);