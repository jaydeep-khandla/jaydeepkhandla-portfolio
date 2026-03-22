import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['frontend', 'backend', 'ui', 'tools'],
      required: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill =
  mongoose.models.Skill || mongoose.model('Skill', skillSchema);
