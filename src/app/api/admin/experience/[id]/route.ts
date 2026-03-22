import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Experience } from '@/app/models/Experience';
import { verifyAdminAuth } from '@/app/libs/authMiddleware';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResponse = verifyAdminAuth(request);
    if (!authResponse.isValid) {
      return NextResponse.json(
        { success: false, message: authResponse.error || 'Unauthorized' },
        { status: 401 },
      );
    }

    await connectDB();
    const experience = await Experience.findById(params.id);

    if (!experience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching experience' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const experience = await Experience.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    console.error('Error updating experience:', error);
    const message =
      error instanceof Error ? error.message : 'Error updating experience';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResponse = verifyAdminAuth(request);
    if (!authResponse.isValid) {
      return NextResponse.json(
        { success: false, message: authResponse.error || 'Unauthorized' },
        { status: 401 },
      );
    }

    await connectDB();
    const experience = await Experience.findByIdAndDelete(params.id);

    if (!experience) {
      return NextResponse.json(
        { success: false, message: 'Experience not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Experience deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting experience' },
      { status: 500 },
    );
  }
}
