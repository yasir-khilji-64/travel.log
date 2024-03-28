import { NextResponse } from 'next/server';

import database from '@/utils/db';

interface MessageResponse {
  status: number;
  message?: string;
  data?: unknown;
}

export async function GET() {
  const logs = await database.collection('logs').find().toArray();
  return NextResponse.json<MessageResponse>(
    {
      status: 200,
      message: 'Hello, World',
      data: logs,
    },
    {
      status: 200,
    }
  );
}
