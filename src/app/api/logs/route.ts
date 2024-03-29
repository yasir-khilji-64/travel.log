import { NextRequest, NextResponse } from 'next/server';

import { TravelLogSchema, TravelLogType } from '@/lib/logs/TravelLogSchema';
import { TravelLogWithId, TravelLogs } from '@/lib/logs/TravelLogModel';

interface MessageResponse {
  status: number;
  message: string;
}

interface APIResponse<T> extends MessageResponse {
  data: T;
}

interface ErrorResponse<T> extends MessageResponse {
  error: T;
}

interface APIRequest extends NextRequest {
  json: () => Promise<TravelLogType>;
}

export const config = {
  api: {
    bodyParser: true,
  },
};

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

export async function POST(req: APIRequest) {
  try {
    const data = await req.json();
    const validated = await TravelLogSchema.parseAsync(data);
    const result = await TravelLogs.insertOne(validated);
    return NextResponse.json<APIResponse<TravelLogWithId>>(
      {
        status: 201,
        message: 'Log created',
        data: {
          ...validated,
          _id: result.insertedId,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    const status = error?.name === 'ZodError' ? 422 : 500;
    return NextResponse.json<ErrorResponse<unknown>>(
      {
        status,
        message: 'Server error',
        error,
      },
      {
        status,
      }
    );
  }
}
