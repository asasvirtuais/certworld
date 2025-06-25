// CRUD operations for cert-world using the CRUD library pattern
import { 
  certificatesTable, 
  coursesTable, 
  lessonsTable,
  type Certificate, 
  type Course, 
  type CertificateInput, 
  type CourseInput,
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
  
  // Get course with its lessons
  async getWithCurriculum(courseId: string) {
    const course = await courseCrud.find(courseId);
    const lessons = await lessonCrud.getByCourse(courseId);
    
    return {
      ...course,
      lessons
    };
  }
};