import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { Skill } from '@/app/models/Skill';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET all skills (admin)
export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching skills' },
      { status: 500 },
    );
  }
}

// POST new skill
export async function POST(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const body = await request.json();

    const skill = new Skill(body);
    await skill.save();

    return NextResponse.json(
      { success: true, message: 'Skill created', data: skill },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
