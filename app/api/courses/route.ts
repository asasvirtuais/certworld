import { NextRequest, NextResponse } from 'next/server';
import { courseCrud } from '../../../lib/crud';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, any> = {};
    
    // Parse query parameters
    for (const [key, value] of searchParams.entries()) {
      if (key === 'category' || key === 'level' || key === 'instructor') {
        query[key] = value;
      } else if (key === 'isActive') {
        query[key] = value === 'true';
      }
    }
    
    const courses = await courseCrud.list(query);
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.instructor || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, instructor, category' },
        { status: 400 }
      );
    }
    
    // Set default values
    const courseData = {
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true,
      duration: data.duration || 1,
      level: data.level || 'beginner',
      price: data.price || 0
    };
    
    const course = await courseCrud.create(courseData);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}