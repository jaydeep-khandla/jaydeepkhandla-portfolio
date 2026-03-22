import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Project } from '@/app/models/Project';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching project' },
      { status: 500 },
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const body = await request.json();

    const project = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated',
      data: project,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted',
      data: project,
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
