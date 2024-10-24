import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    ticketCount: {
        type: Number,
        required: true,
    },
    qrCode: {  
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    checkedIn: {  // Mark when the user checks in with the QR code
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const Bookings = mongoose.model('Bookings', bookingSchema);