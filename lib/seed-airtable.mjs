// Script to seed Airtable with sample data from the frontend
import sdk from '@asasvirtuais/airtable/sdk';

const token = 'patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20';
const baseId = process.env.AIRTABLE_BASE_ID || 'appYourBaseIdHere'; // User needs to provide this

console.log('🌱 Seeding Airtable with sample data...');
console.log(`📋 Base ID: ${baseId}`);

const airtable = sdk(token);
const base = airtable.base(baseId);

// Sample data from the frontend
const sampleCourses = [
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
    level: 'beginner',
    createdAt: new Date().toISOString(),
    lastEdited: new Date().toISOString()
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
    level: 'intermediate',
    createdAt: new Date().toISOString(),
    lastEdited: new Date().toISOString()
  },
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
    price: 129.99,
    createdAt: new Date().toISOString(),
    lastEdited: '2025-04-30'
  }
];

const sampleCertificates = [
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
  }
];

async function seedData() {
  try {
    console.log('📚 Creating sample courses...');
    const coursesTable = base.table('Courses');
    const createdCourses = [];
    
    for (const course of sampleCourses) {
      try {
        const created = await coursesTable.records.create(course);
        createdCourses.push(created);
        console.log(`✅ Created course: ${course.title}`);
      } catch (error) {
        console.log(`❌ Failed to create course "${course.title}":`, error.message);
      }
    }

    console.log('\n📜 Creating sample certificates...');
    const certificatesTable = base.table('Certificates');
    
    for (const certificate of sampleCertificates) {
      try {
        await certificatesTable.records.create(certificate);
        console.log(`✅ Created certificate: ${certificate.title}`);
      } catch (error) {
        console.log(`❌ Failed to create certificate "${certificate.title}":`, error.message);
      }
    }

    // Create sample sections and lessons for the first course
    if (createdCourses.length > 0) {
      const firstCourse = createdCourses[0];
      console.log(`\n📖 Creating sample sections for "${firstCourse.title}"...`);
      
      const sectionsTable = base.table('Sections');
      const lessonsTable = base.table('Lessons');
      
      const sampleSections = [
        {
          courseId: firstCourse.id,
          titleEn: 'INTRODUCTION TO FOOD SAFETY',
          titleEs: 'INTRODUCCIÓN A LA SEGURIDAD ALIMENTARIA',
          order: 1
        },
        {
          courseId: firstCourse.id,
          titleEn: 'FOOD HANDLING BASICS',
          titleEs: 'FUNDAMENTOS DEL MANEJO DE ALIMENTOS',
          order: 2
        }
      ];

      const createdSections = [];
      for (const section of sampleSections) {
        try {
          const created = await sectionsTable.records.create(section);
          createdSections.push(created);
          console.log(`✅ Created section: ${section.titleEn}`);
        } catch (error) {
          console.log(`❌ Failed to create section "${section.titleEn}":`, error.message);
        }
      }

      // Create sample lessons for the first section
      if (createdSections.length > 0) {
        const firstSection = createdSections[0];
        console.log(`\n📝 Creating sample lessons for "${firstSection.titleEn}"...`);
        
        const sampleLessons = [
          {
            courseId: firstCourse.id,
            sectionId: firstSection.id,
            titleEn: 'What is Food Safety?',
            titleEs: '¿Qué es la Seguridad Alimentaria?',
            type: 'lesson',
            order: 1
          },
          {
            courseId: firstCourse.id,
            sectionId: firstSection.id,
            titleEn: 'Food Safety Regulations',
            titleEs: 'Regulaciones de Seguridad Alimentaria',
            type: 'lesson',
            order: 2
          },
          {
            courseId: firstCourse.id,
            sectionId: firstSection.id,
            titleEn: 'Introduction Quiz',
            titleEs: 'Examen de Introducción',
            type: 'quiz',
            order: 3
          }
        ];

        for (const lesson of sampleLessons) {
          try {
            await lessonsTable.records.create(lesson);
            console.log(`✅ Created lesson: ${lesson.titleEn}`);
          } catch (error) {
            console.log(`❌ Failed to create lesson "${lesson.titleEn}":`, error.message);
          }
        }
      }

      // Create sample user progress
      console.log('\n👤 Creating sample user progress...');
      const userProgressTable = base.table('UserProgress');
      
      const sampleProgress = [
        {
          userId: 'user_demo',
          courseId: firstCourse.id,
          progress: 30,
          lessonsCompleted: 1,
          totalLessons: 3,
          isComplete: false,
          startedAt: new Date().toISOString()
        }
      ];

      for (const progress of sampleProgress) {
        try {
          await userProgressTable.records.create(progress);
          console.log(`✅ Created user progress for course: ${firstCourse.title}`);
        } catch (error) {
          console.log(`❌ Failed to create user progress:`, error.message);
        }
      }
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start your Next.js development server: npm run dev');
    console.log('2. Visit http://localhost:3000/dashboard to see your courses');
    console.log('3. Check http://localhost:3000/certificate to see certificates');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    
    if (error.message.includes('NOT_FOUND')) {
      console.log('\n🔧 Setup required:');
      console.log('1. Create your Airtable base following AIRTABLE_SETUP.md');
      console.log('2. Update the baseId in this script or set AIRTABLE_BASE_ID environment variable');
      console.log('3. Make sure all tables (Courses, Certificates, UserProgress, Sections, Lessons) exist');
    }
  }
}

// Run the seeding
seedData();