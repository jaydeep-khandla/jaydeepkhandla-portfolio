import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/app/libs/seedDatabase';

/**
 * POST /api/admin/seed
 * Seeds the database with initial data from data.ts
 *
 * SECURITY WARNING: This route should be protected with authentication
 * Currently accessible for development - add auth middleware in production
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication check here
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

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
  return NextResponse.json({
    message: 'Database Seeding Endpoint',
    description: 'POST to this endpoint to seed the database with initial data',
    endpoint: '/api/admin/seed',
    method: 'POST',
    note: 'This will clear existing data and insert fresh data from data.ts',
    security: 'TODO: Add authentication middleware',
  });
}
