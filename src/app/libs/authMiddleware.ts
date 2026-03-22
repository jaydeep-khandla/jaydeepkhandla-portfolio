import { NextRequest, NextResponse } from 'next/server';

export const verifyAdminAuth = (request: NextRequest) => {
  try {
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_TOKEN;

    if (!authHeader || !adminToken) {
      return { isValid: false, error: 'Unauthorized' };
    }

    const token = authHeader.replace('Bearer ', '');

    if (token !== adminToken) {
      return { isValid: false, error: 'Invalid token' };
    }

    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: 'Authentication failed' };
  }
};

export const adminAuthResponse = () => {
  return NextResponse.json(
    { success: false, message: 'Unauthorized access' },
    { status: 401 },
  );
};
