import { NextResponse } from 'next/server';
import generations from '@/lib/mock-data/generations.json';

export async function GET() {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return NextResponse.json({
    data: generations,
    success: true
  });
}
