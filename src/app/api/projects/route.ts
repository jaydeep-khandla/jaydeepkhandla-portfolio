import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Project } from '@/app/models/Project';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching projects' },
      { status: 500 },
    );
  }
}
