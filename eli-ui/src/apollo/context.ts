import { NextRequest } from 'next/server';

export async function context({ req }: { req: NextRequest }) {
  // Get the user token from the headers
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  return {
    token,
  };
} 