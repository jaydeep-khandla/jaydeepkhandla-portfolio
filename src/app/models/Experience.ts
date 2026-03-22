import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    organizationWebsite: {
      type: String,
      default: '',
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optional field
          return /^(https?:\/\/).+/.test(v);
        },
        message: 'Invalid URL format for organization website',
      },
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrentRole: {
      type: Boolean,
      default: false,
    },
    timeline: {
      type: String,
      required: true,
      description: 'Human readable timeline (e.g., "Jan 2023 - Present")',
    },
    verificationDocUrl: {
      type: String,
      default: '',
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optional field
          return /^(https?|file):\/\/.+/.test(v);
        },
        message: 'Invalid URL format for verification document',
      },
    },
    verificationDocName: {
      type: String,
      default: 'Verification Document',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Experience =
  mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
