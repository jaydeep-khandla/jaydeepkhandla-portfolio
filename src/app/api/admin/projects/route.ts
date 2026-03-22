import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Project } from '@/app/models/Project';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET all projects (admin)
export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

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

// POST new project
export async function POST(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const body = await request.json();

    const project = new Project(body);
    await project.save();

    return NextResponse.json(
      { success: true, message: 'Project created', data: project },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
