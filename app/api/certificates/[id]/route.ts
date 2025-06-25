import { NextRequest, NextResponse } from 'next/server';
import { certificateCrud } from '../../../../lib/crud';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certificate = await certificateCrud.find(params.id);
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json(
      { error: 'Certificate not found' },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const certificate = await certificateCrud.update(params.id, data);
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error updating certificate:', error);
    return NextResponse.json(
      { error: 'Failed to update certificate' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await certificateCrud.remove(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 }
    );
  }
}