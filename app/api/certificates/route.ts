import { NextRequest, NextResponse } from 'next/server';
import { certificateCrud } from '../../../lib/crud';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, any> = {};
    
    // Parse query parameters
    for (const [key, value] of searchParams.entries()) {
      if (key === 'status' || key === 'issuer') {
        query[key] = value;
      }
    }
    
    const certificates = await certificateCrud.list(query);
    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.issuer || !data.recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: title, issuer, recipientEmail' },
        { status: 400 }
      );
    }
    
    // Set default values
    const certificateData = {
      ...data,
      dateIssued: data.dateIssued || new Date().toISOString(),
      status: data.status || 'active'
    };
    
    const certificate = await certificateCrud.create(certificateData);
    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    );
  }
}