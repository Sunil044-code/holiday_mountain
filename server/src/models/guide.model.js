import mongoose, { Schema } from "mongoose";

const guideSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    certification: {
      type: String,
      trim: true,
    },

    experience_years: {
      type: Number,
      default: 0,
      min: 0,
    },

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    specialization: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    profile_image: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 1000,
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Guide = mongoose.model(
  "Guide",
  guideSchema
);