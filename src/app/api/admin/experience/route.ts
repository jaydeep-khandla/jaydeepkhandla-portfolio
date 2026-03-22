import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Experience } from '@/app/models/Experience';
import { verifyAdminAuth } from '@/app/libs/authMiddleware';

export async function GET(request: NextRequest) {
  try {
    const authResponse = verifyAdminAuth(request);
    if (!authResponse.isValid) {
      return NextResponse.json(
        { success: false, message: authResponse.error || 'Unauthorized' },
        { status: 401 },
      );
    }

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

export async function POST(request: NextRequest) {
  try {
    const authResponse = verifyAdminAuth(request);
    if (!authResponse.isValid) {
      return NextResponse.json(
        { success: false, message: authResponse.error || 'Unauthorized' },
        { status: 401 },
      );
    }

    await connectDB();
    const body = await request.json();

    const experience = new Experience(body);
    const savedExperience = await experience.save();

    return NextResponse.json(
      { success: true, data: savedExperience },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating experience:', error);
    const message =
      error instanceof Error ? error.message : 'Error creating experience';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
