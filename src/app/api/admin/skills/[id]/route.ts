import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Skill } from '@/app/models/Skill';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET single skill
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
    const skill = await Skill.findById(params.id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching skill' },
      { status: 500 },
    );
  }
}

// PUT update skill
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

    const skill = await Skill.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Skill updated',
      data: skill,
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}

// DELETE skill
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
    const skill = await Skill.findByIdAndDelete(params.id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: 'Skill not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Skill deleted',
      data: skill,
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
