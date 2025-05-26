import { NextResponse } from 'next/server';
import { getConfig } from '@/apollo/server/config';

export async function GET() {
  try {
    const config = getConfig();
    const encodedTelemetryKey = config.posthogApiKey
      ? Buffer.from(config.posthogApiKey).toString('base64')
      : '';

    return NextResponse.json({
      isTelemetryEnabled: config.telemetryEnabled || false,
      telemetryKey: encodedTelemetryKey,
      telemetryHost: config.posthogHost || '',
      userUUID: config.userUUID || '',
    });
  } catch (error) {
    console.error('Error in config API:', error);
    return NextResponse.json(
      { error: 'Failed to get configuration' },
      { status: 500 }
    );
  }
} 