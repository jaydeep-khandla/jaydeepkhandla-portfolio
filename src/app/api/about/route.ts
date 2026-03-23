import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoConnect';
import { AboutSection } from '@/app/models/AboutSection';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const about = await AboutSection.findOne();

    if (!about) {
      return NextResponse.json(
        { success: false, message: 'About section not found' },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          },
        },
      );
    }

    return NextResponse.json(
      { success: true, data: about },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching about section:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching about section' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      },
    );
  }
}
