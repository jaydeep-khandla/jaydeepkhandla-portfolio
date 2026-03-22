import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Experience } from '@/app/models/Experience';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching experiences' },
      { status: 500 },
    );
  }
}
