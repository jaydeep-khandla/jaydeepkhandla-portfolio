import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { AboutSection } from '@/app/models/AboutSection';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET about section (admin)
export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const about = await AboutSection.findOne();

    if (!about) {
      return NextResponse.json(
        { success: false, message: 'About section not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching about section' },
      { status: 500 },
    );
  }
}

// POST create about section (only first time)
export async function POST(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const existingAbout = await AboutSection.findOne();

    if (existingAbout) {
      return NextResponse.json(
        { success: false, message: 'About section already exists' },
        { status: 400 },
      );
    }

    const body = await request.json();
    const about = new AboutSection(body);
    await about.save();

    return NextResponse.json(
      { success: true, message: 'About section created', data: about },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating about section:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}

// PUT update about section
export async function PUT(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const body = await request.json();

    const about = await AboutSection.findOneAndUpdate({}, body, {
      new: true,
      runValidators: true,
    });

    if (!about) {
      return NextResponse.json(
        { success: false, message: 'About section not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'About section updated',
      data: about,
    });
  } catch (error) {
    console.error('Error updating about section:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
