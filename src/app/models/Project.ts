import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    urlTitle: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(https?:\/\/).+/.test(v);
        },
        message: 'Invalid URL format',
      },
    },
    tech: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUrl: {
      type: String,
      default: '',
    },
    imageAlt: {
      type: String,
      default: 'Project image',
    },
    featured: {
      type: Boolean,
      default: false,
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

export const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);
