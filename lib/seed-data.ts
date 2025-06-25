// Sample data based on frontend mock data to seed Airtable
import { CourseInput, CertificateInput, SectionInput, LessonInput, UserProgressInput } from './airtable';

// Course data from components/layout/courses.tsx
export const sampleCourses: CourseInput[] = [
  {
    title: 'TEXAS | Food Safety Certification',
    category: 'Food Safety Certification',
    location: 'Texas, United States',
    region: 'Texas, United States',
    country: 'United States',
    state: 'Texas',
    languages: 'English / Spanish',
    duration: '2 hours',
    isActive: true,
    status: 'Open to All Learners',
    instructor: 'Food Safety Institute',
    description: 'Comprehensive food safety certification course for Texas food service workers.',
    price: 49.99,
    level: 'beginner'
  },
  {
    title: 'CALIFORNIA | Notary Public Prep',
    category: 'Notary Public Preparation',
    location: 'California, United States',
    region: 'California, United States',
    country: 'United States',
    state: 'California',
    languages: 'English / Spanish',
    duration: '3 hours',
    isActive: true,
    status: 'Open to All Learners',
    instructor: 'Notary Education Institute',
    description: 'Prepare for the California Notary Public examination with bilingual support.',
    price: 79.99,
    level: 'intermediate'
  },
  {
    title: 'TEXAS | Real Estate Sales Agent',
    category: 'Real Estate License',
    location: 'Texas, United States',
    region: 'Texas, United States',
    country: 'United States',
    state: 'Texas',
    languages: 'English / Spanish',
    duration: '4 hours',
    isActive: true,
    status: 'Open to All Learners',
    instructor: 'Real Estate Academy',
    description: 'Complete preparation course for Texas Real Estate Sales Agent licensing.',
    price: 149.99,
    level: 'advanced'
  },
  {
    title: 'FLORIDA | Alcohol Server Training',
    category: 'Alcohol Service Training',
    location: 'Florida, United States',
    region: 'Florida, United States',
    country: 'United States',
    state: 'Florida',
    languages: 'English / Spanish',
    duration: '1.5 hours',
    isActive: true,
    status: 'Open to All Learners',
    instructor: 'Hospitality Training Center',
    description: 'Responsible alcohol service training for Florida hospitality workers.',
    price: 29.99,
    level: 'beginner'
  },
  {
    title: 'NEW YORK | Security Guard License',
    category: 'Security Guard Certification',
    location: 'New York, United States',
    region: 'New York, United States',
    country: 'United States',
    state: 'New York',
    languages: 'English / Spanish',
    duration: '6 hours',
    isActive: true,
    status: 'Closed to New Learners',
    instructor: 'Security Training Institute',
    description: 'Comprehensive security guard training for New York state licensing.',
    price: 99.99,
    level: 'intermediate'
  },
  {
    title: 'CALIFORNIA | Contractor License Prep',
    category: 'Contractor Certification',
    location: 'California, United States',
    region: 'California, United States',
    country: 'United States',
    state: 'California',
    languages: 'English / Spanish',
    duration: '8 hours',
    isActive: false,
    status: 'Draft',
    instructor: 'Construction Education Center',
    description: 'Prepare for the California contractor licensing examination.',
    price: 199.99,
    level: 'advanced'
  }
];

// Dashboard course data from components/layout/dashboard.tsx
export const sampleDashboardCourses: CourseInput[] = [
  {
    title: 'Advanced Spanish Grammar',
    category: 'Language Learning',
    status: 'Closed to All Learners',
    duration: '40 hours',
    isActive: false,
    languages: 'Spanish',
    instructor: 'Prof. Maria Rodriguez',
    description: 'Advanced grammar concepts for Spanish language learners.',
    level: 'advanced',
    price: 129.99
  },
  {
    title: 'Business English for Beginners',
    category: 'Language Learning',
    status: 'Open to All Learners',
    duration: '30 hours',
    isActive: true,
    languages: 'English',
    instructor: 'Dr. James Smith',
    description: 'Essential business English skills for professionals.',
    level: 'beginner',
    price: 89.99
  },
  {
    title: 'English for Medical Professionals',
    category: 'Medical Education',
    status: 'Closed to New Learners',
    duration: '35 hours',
    isActive: true,
    languages: 'English / Spanish',
    instructor: 'Dr. Sarah Johnson',
    description: 'Specialized English terminology for healthcare workers.',
    level: 'intermediate',
    price: 159.99
  },
  {
    title: 'Introduction to Spanish',
    category: 'Language Learning',
    status: 'Open to All Learners',
    duration: '25 hours',
    isActive: true,
    languages: 'Spanish / English',
    instructor: 'Prof. Carlos Garcia',
    description: 'Basic Spanish language skills for beginners.',
    level: 'beginner',
    price: 69.99
  },
  {
    title: 'Spanish Vocabulary Builder',
    category: 'Language Learning',
    status: 'Draft',
    duration: '15 hours',
    isActive: false,
    languages: 'Spanish / English',
    instructor: 'Prof. Ana Martinez',
    description: 'Expand your Spanish vocabulary with interactive exercises.',
    level: 'intermediate',
    price: 49.99
  }
];

// Certificate data
export const sampleCertificates: CertificateInput[] = [
  {
    title: 'Food Safety Certification',
    issuer: 'CertWorld Academy',
    recipientName: 'Demo User',
    recipientEmail: 'demo@example.com',
    category: 'Food Safety',
    dateIssued: '2025-05-04',
    status: 'active',
    description: 'Successfully completed the Texas Food Safety Certification course.',
    completedDate: '2025-05-04'
  },
  {
    title: 'Notary Public Preparation Certificate',
    issuer: 'CertWorld Academy',
    recipientName: 'Jane Smith',
    recipientEmail: 'jane.smith@example.com',
    category: 'Notary Public',
    dateIssued: '2025-04-15',
    status: 'active',
    description: 'Successfully completed the California Notary Public Preparation course.',
    completedDate: '2025-04-15'
  },
  {
    title: 'Real Estate Sales Agent Certificate',
    issuer: 'CertWorld Academy',
    recipientName: 'John Doe',
    recipientEmail: 'john.doe@example.com',
    category: 'Real Estate',
    dateIssued: '2025-03-20',
    expiryDate: '2027-03-20',
    status: 'active',
    description: 'Successfully completed the Texas Real Estate Sales Agent course.',
    completedDate: '2025-03-20'
  }
];

// Course sections and lessons from components/layout/course.tsx
export const sampleSections: Omit<SectionInput, 'courseId'>[] = [
  {
    titleEn: 'INTRODUCTION TO LEARNING',
    titleEs: 'INTRODUCCIÓN AL APRENDIZAJE',
    order: 1
  },
  {
    titleEn: 'FUNDAMENTALS',
    titleEs: 'FUNDAMENTOS',
    order: 2
  },
  {
    titleEn: 'ADVANCED CONCEPTS',
    titleEs: 'CONCEPTOS AVANZADOS',
    order: 3
  },
  {
    titleEn: 'FINAL ASSESSMENT',
    titleEs: 'EVALUACIÓN FINAL',
    order: 4
  }
];

export const sampleLessons: Omit<LessonInput, 'courseId' | 'sectionId'>[] = [
  // Introduction section lessons
  { titleEn: 'What is Learning?', titleEs: '¿Qué es el Aprendizaje?', type: 'lesson', order: 1 },
  { titleEn: 'Learning Styles', titleEs: 'Estilos de Aprendizaje', type: 'lesson', order: 2 },
  { titleEn: 'Setting Goals', titleEs: 'Estableciendo Metas', type: 'lesson', order: 3 },
  { titleEn: 'Introduction Quiz', titleEs: 'Examen de Introducción', type: 'quiz', order: 4 },
  
  // Fundamentals section lessons
  { titleEn: 'Basic Principles', titleEs: 'Principios Básicos', type: 'lesson', order: 1 },
  { titleEn: 'Key Concepts', titleEs: 'Conceptos Clave', type: 'lesson', order: 2 },
  { titleEn: 'Practical Applications', titleEs: 'Aplicaciones Prácticas', type: 'lesson', order: 3 },
  { titleEn: 'Fundamentals Quiz', titleEs: 'Examen de Fundamentos', type: 'quiz', order: 4 },
  
  // Advanced concepts lessons
  { titleEn: 'Advanced Techniques', titleEs: 'Técnicas Avanzadas', type: 'lesson', order: 1 },
  { titleEn: 'Case Studies', titleEs: 'Estudios de Caso', type: 'lesson', order: 2 },
  { titleEn: 'Best Practices', titleEs: 'Mejores Prácticas', type: 'lesson', order: 3 },
  { titleEn: 'Advanced Quiz', titleEs: 'Examen Avanzado', type: 'quiz', order: 4 },
  
  // Final assessment
  { titleEn: 'Final Examination', titleEs: 'Examen Final', type: 'quiz', order: 1 },
  { titleEn: 'Course Review', titleEs: 'Revisión del Curso', type: 'lesson', order: 2 }
];

// User progress data from components/layout/welcome.tsx
export const sampleUserProgress: Omit<UserProgressInput, 'courseId'>[] = [
  {
    userId: 'user_demo',
    progress: 50,
    lessonsCompleted: 2,
    totalLessons: 4,
    isComplete: false,
    startedAt: '2025-04-01'
  },
  {
    userId: 'user_demo',
    progress: 100,
    lessonsCompleted: 4,
    totalLessons: 4,
    isComplete: true,
    startedAt: '2025-03-15',
    completedAt: '2025-04-15'
  }
];