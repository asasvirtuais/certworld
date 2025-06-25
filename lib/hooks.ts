'use client';

import { useState, useEffect } from 'react';
import { 
  Certificate, 
  Course, 
  CertificateInput, 
  CourseInput,
  Lesson,
  LessonInput
} from './airtable';

// Generic fetch hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Certificate hooks
export function useCertificates(query?: Record<string, string>) {
  const queryString = query ? '?' + new URLSearchParams(query).toString() : '';
  return useFetch<Certificate[]>(`/api/certificates${queryString}`);
}

export function useCertificate(id: string) {
  return useFetch<Certificate>(`/api/certificates/${id}`);
}

export function useCertificateActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CertificateInput): Promise<Certificate> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create certificate');
      }
      
      const certificate = await response.json();
      setLoading(false);
      return certificate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  const update = async (id: string, data: Partial<CertificateInput>): Promise<Certificate> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update certificate');
      }
      
      const certificate = await response.json();
      setLoading(false);
      return certificate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  const remove = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete certificate');
      }
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  return { create, update, remove, loading, error };
}

// Course hooks
export function useCourses(query?: Record<string, string>) {
  const queryString = query ? '?' + new URLSearchParams(query).toString() : '';
  return useFetch<Course[]>(`/api/courses${queryString}`);
}

export function useCourse(id: string) {
  return useFetch<Course>(`/api/courses/${id}`);
}

export function useCourseActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CourseInput): Promise<Course> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      
      const course = await response.json();
      setLoading(false);
      return course;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  const update = async (id: string, data: Partial<CourseInput>): Promise<Course> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      
      const course = await response.json();
      setLoading(false);
      return course;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  const remove = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      throw err;
    }
  };

  return { create, update, remove, loading, error };
}

// Enhanced course hooks
export function useCourseWithCurriculum(courseId: string) {
  return useFetch<Course & { lessons: Lesson[] }>(`/api/courses/${courseId}/curriculum`);
}