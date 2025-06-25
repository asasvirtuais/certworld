// CRUD operations for cert-world using the CRUD library pattern
import { 
  certificatesTable, 
  coursesTable, 
  userProgressTable,
  sectionsTable,
  lessonsTable,
  type Certificate, 
  type Course, 
  type CertificateInput, 
  type CourseInput,
  type UserProgress,
  type UserProgressInput,
  type Section,
  type SectionInput,
  type Lesson,
  type LessonInput
} from './airtable';

// Certificate CRUD operations
export const certificateCrud = {
  async list(query?: Record<string, any>) {
    return certificatesTable.records.list(query);
  },
  
  async find(id: string) {
    return certificatesTable.records.find(id);
  },
  
  async create(data: CertificateInput) {
    return certificatesTable.records.create(data);
  },
  
  async update(id: string, data: Partial<CertificateInput>) {
    return certificatesTable.records.update(id, data);
  },
  
  async remove(id: string) {
    return certificatesTable.records.remove(id);
  }
};

// Course CRUD operations
export const courseCrud = {
  async list(query?: Record<string, any>) {
    return coursesTable.records.list(query);
  },
  
  async find(id: string) {
    return coursesTable.records.find(id);
  },
  
  async create(data: CourseInput) {
    return coursesTable.records.create(data);
  },
  
  async update(id: string, data: Partial<CourseInput>) {
    return coursesTable.records.update(id, data);
  },
  
  async remove(id: string) {
    return coursesTable.records.remove(id);
  }
};

// User Progress CRUD operations
export const userProgressCrud = {
  async list(query?: Record<string, any>) {
    return userProgressTable.records.list(query);
  },
  
  async find(id: string) {
    return userProgressTable.records.find(id);
  },
  
  async create(data: UserProgressInput) {
    return userProgressTable.records.create(data);
  },
  
  async update(id: string, data: Partial<UserProgressInput>) {
    return userProgressTable.records.update(id, data);
  },
  
  async remove(id: string) {
    return userProgressTable.records.remove(id);
  },
  
  // Helper methods for user progress
  async getByUser(userId: string) {
    return userProgressTable.records.list({ userId });
  },
  
  async getByCourse(courseId: string) {
    return userProgressTable.records.list({ courseId });
  },
  
  async getUserCourseProgress(userId: string, courseId: string) {
    return userProgressTable.records.list({ userId, courseId });
  }
};

// Section CRUD operations
export const sectionCrud = {
  async list(query?: Record<string, any>) {
    return sectionsTable.records.list(query);
  },
  
  async find(id: string) {
    return sectionsTable.records.find(id);
  },
  
  async create(data: SectionInput) {
    return sectionsTable.records.create(data);
  },
  
  async update(id: string, data: Partial<SectionInput>) {
    return sectionsTable.records.update(id, data);
  },
  
  async remove(id: string) {
    return sectionsTable.records.remove(id);
  },
  
  // Helper methods for sections
  async getByCourse(courseId: string) {
    return sectionsTable.records.list({ courseId });
  }
};

// Lesson CRUD operations
export const lessonCrud = {
  async list(query?: Record<string, any>) {
    return lessonsTable.records.list(query);
  },
  
  async find(id: string) {
    return lessonsTable.records.find(id);
  },
  
  async create(data: LessonInput) {
    return lessonsTable.records.create(data);
  },
  
  async update(id: string, data: Partial<LessonInput>) {
    return lessonsTable.records.update(id, data);
  },
  
  async remove(id: string) {
    return lessonsTable.records.remove(id);
  },
  
  // Helper methods for lessons
  async getByCourse(courseId: string) {
    return lessonsTable.records.list({ courseId });
  },
  
  async getBySection(sectionId: string) {
    return lessonsTable.records.list({ sectionId });
  },
  
  async getCourseLessons(courseId: string, sectionId: string) {
    return lessonsTable.records.list({ courseId, sectionId });
  }
};

// Generic CRUD interface compatible with your CRUD library
export interface CRUDService<T, D> {
  list(query?: Record<string, any>): Promise<T[]>;
  find(id: string): Promise<T>;
  create(data: D): Promise<T>;
  update(id: string, data: Partial<D>): Promise<T>;
  remove(id: string): Promise<{ id: string }>;
}

// Factory function to create CRUD services
export function createCRUDService<T, D>(table: typeof certificatesTable): CRUDService<T, D> {
  return {
    async list(query?: Record<string, any>) {
      return table.records.list(query) as Promise<T[]>;
    },
    
    async find(id: string) {
      return table.records.find(id) as Promise<T>;
    },
    
    async create(data: D) {
      return table.records.create(data as any) as Promise<T>;
    },
    
    async update(id: string, data: Partial<D>) {
      return table.records.update(id, data as any) as Promise<T>;
    },
    
    async remove(id: string) {
      return table.records.remove(id);
    }
  };
}

// Enhanced course CRUD with related data
export const enhancedCourseCrud = {
  ...courseCrud,
  
  // Get course with its sections and lessons
  async getWithCurriculum(courseId: string) {
    const course = await courseCrud.find(courseId);
    const sections = await sectionCrud.getByCourse(courseId);
    
    // Get lessons for each section
    const sectionsWithLessons = await Promise.all(
      sections.map(async (section) => ({
        ...section,
        lessons: await lessonCrud.getBySection(section.id)
      }))
    );
    
    return {
      ...course,
      sections: sectionsWithLessons
    };
  },
  
  // Get course with user progress
  async getWithUserProgress(courseId: string, userId: string) {
    const course = await courseCrud.find(courseId);
    const progress = await userProgressCrud.getUserCourseProgress(userId, courseId);
    
    return {
      ...course,
      userProgress: progress[0] || null
    };
  }
};