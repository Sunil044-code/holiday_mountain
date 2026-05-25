import mongoose, { Schema } from "mongoose";

const itinerarySchema = new Schema({
  trek_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trek",
    required: true
  },
  day_number: {
    type: Number,
    required: true,
    min: 1
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });


itinerarySchema.index(
  { trek_id: 1, day_number: 1 },
  { unique: true }
);
export const Itinerary=mongoose.model("Itinerary",itinerarySchema)