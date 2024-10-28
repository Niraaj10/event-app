import mongoose, { Schema } from "mongoose";

const suggestionsSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventRecommendations: [{
      type: Schema.Types.ObjectId,
      ref: 'Event',
    }],
    interests: [{
      type: String,  // Store user interests like event categories, location preferences
    }],
    locationPreference: {
      type: String,  // Store location data to recommend local events
    },
  }, {
    timestamps: true,
});
  
export const EventSuggestions = mongoose.model('EventSuggestions', suggestionsSchema);