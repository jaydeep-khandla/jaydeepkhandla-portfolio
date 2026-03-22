import mongoose from 'mongoose';

const aboutSectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: 'Full Stack Web Developer',
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      description:
        'Bio text with preserved formatting - supports newlines and whitespace like markdown or pre-formatted text',
    },
    profileImageUrl: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    instagramUrl: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AboutSection =
  mongoose.models.AboutSection ||
  mongoose.model('AboutSection', aboutSectionSchema);
