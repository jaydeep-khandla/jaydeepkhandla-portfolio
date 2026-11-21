import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/app/libs/seedDatabase';

import { verifyAdminAuth, adminAuthResponse } from '@/app/libs/authMiddleware';

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request).isValid) return adminAuthResponse();
  try {
    const result = await seedDatabase();

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: result.summary,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/admin/seed
 * Returns seeding status/documentation
 */
export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request).isValid) return adminAuthResponse();
  return NextResponse.json({
    message: 'Database Seeding Endpoint',
    description: 'POST to this endpoint to seed the database with initial data',
    endpoint: '/api/admin/seed',
    method: 'POST',
    note: 'This will clear existing data and insert fresh data from data.ts',
  });
}
