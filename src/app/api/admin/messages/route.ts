import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { ContactMessage } from '@/app/models/ContactMessage';
import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';
import { transporter, mailOptions } from '@/app/config/nodemailer';

// GET all messages (admin)
export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching messages' },
      { status: 500 },
    );
  }
}

// DELETE message
export async function DELETE(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  if (!auth.isValid) {
    return adminAuthResponse();
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');

    if (!messageId) {
      return NextResponse.json(
        { success: false, message: 'Message ID is required' },
        { status: 400 },
      );
    }

    const message = await ContactMessage.findByIdAndDelete(messageId);

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted',
      data: message,
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 },
    );
  }
}
