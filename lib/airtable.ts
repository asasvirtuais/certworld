import sdk from '@asasvirtuais/airtable/sdk';

const token = process.env.AIRTABLE_TOKEN || 'patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20';
const baseId = process.env.AIRTABLE_BASE_ID || 'appCertWorld123'; // User needs to provide real base ID

export const airtable = sdk(token);
export const base = airtable.base(baseId);

// Certificate types - aligned with frontend mock data
export interface Certificate {
  id: string;
  title: string;
  description?: string;
  issuer: string;
  dateIssued: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending';
  imageUrl?: string;
  recipientEmail: string;
  recipientName: string;
  // Additional fields from frontend
  completedDate?: string;
  category?: string;
}

export interface CertificateInput {
  title: string;
  description?: string;
  issuer: string;
  dateIssued?: string; // Optional, will default to today
  expiryDate?: string;
  status?: 'active' | 'expired' | 'pending'; // Optional, will default to 'active'
  imageUrl?: string;
  recipientEmail: string;
  recipientName: string;
  completedDate?: string;
  category?: string;
}

// Course types - aligned with frontend mock data structure
export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor?: string;
  duration: string; // Changed to string to match "2 hours" format
  level?: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price?: number;
  isActive: boolean;
  createdAt?: string;
  lastEdited?: string;
  
  // Geographic fields from frontend
  location?: string;
  region?: string;
  country?: string;
  state?: string;
  
  // Bilingual support
  languages?: string; // e.g., "English / Spanish"
  
  // Status fields from dashboard
  status?: string; // e.g., "Open to All Learners", "Closed to All Learners"
  statusColor?: 'success' | 'warning' | 'secondary' | 'default';
}

export interface CourseInput {
  title: string;
  description?: string;
  instructor?: string;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price?: number;
  isActive?: boolean;
  
  // Geographic fields
  location?: string;
  region?: string;
  country?: string;
  state?: string;
  
  // Bilingual support
  languages?: string;
  
  // Status
  status?: string;
}

// User Progress types - for user course enrollment/progress
export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  progress: number; // 0-100
  lessonsCompleted: number;
  totalLessons: number;
  isComplete: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface UserProgressInput {
  userId: string;
  courseId: string;
  progress?: number;
  lessonsCompleted?: number;
  totalLessons?: number;
  isComplete?: boolean;
  startedAt?: string;
  completedAt?: string;
}

// Course Section and Lesson types - for course curriculum
export interface Lesson {
  id: string;
  courseId: string;
  sectionId: string;
  titleEn: string;
  titleEs: string;
  completed?: boolean;
  type: 'lesson' | 'quiz';
  order: number;
}

export interface Section {
  id: string;
  courseId: string;
  titleEn: string;
  titleEs: string;
  order: number;
  lessons?: Lesson[];
}

export interface LessonInput {
  courseId: string;
  sectionId: string;
  titleEn: string;
  titleEs: string;
  type: 'lesson' | 'quiz';
  order: number;
}

export interface SectionInput {
  courseId: string;
  titleEn: string;
  titleEs: string;
  order: number;
}

// Table instances
export const certificatesTable = base.table<Certificate, CertificateInput>('Certificates');
export const coursesTable = base.table<Course, CourseInput>('Courses');
export const userProgressTable = base.table<UserProgress, UserProgressInput>('UserProgress');
export const sectionsTable = base.table<Section, SectionInput>('Sections');
export const lessonsTable = base.table<Lesson, LessonInput>('Lessons');