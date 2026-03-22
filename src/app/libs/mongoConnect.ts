import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local',
    );
  }

  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB;
