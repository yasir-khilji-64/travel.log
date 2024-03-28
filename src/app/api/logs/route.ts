import { NextResponse } from 'next/server';

import { TravelLogWithId, TravelLogs } from '@/lib/logs/TravelLogModel';

interface MessageResponse {
  status: number;
  message: string;
}

interface APIResponse<T> extends MessageResponse {
  data: T;
}

export async function GET() {
  const logs = await TravelLogs.find().toArray();
  return NextResponse.json<APIResponse<TravelLogWithId[]>>(
    {
      status: 200,
      message: 'Logs',
      data: logs,
    },
    {
      status: 200,
    }
  );
}
