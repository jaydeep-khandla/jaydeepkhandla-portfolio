import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { ContactMessage } from '@/app/models/ContactMessage';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

// GET single message
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
    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      { isRead: true },
      { new: true },
    );

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching message' },
      { status: 500 },
    );
  }
}

// PUT update message (mark as replied)
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

    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      {
        ...body,
        isReplied: true,
        repliedAt: new Date(),
      },
      { new: true, runValidators: true },
    );

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message updated',
      data: message,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
