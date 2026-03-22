import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
adminUserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
adminUserSchema.methods.comparePassword = async function (
  enteredPassword: string,
) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const AdminUser =
  mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
