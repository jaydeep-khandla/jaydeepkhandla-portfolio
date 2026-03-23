import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Skill } from '@/app/models/Skill';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1 });
    return NextResponse.json(
      { success: true, data: skills },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching skills' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  }
}
