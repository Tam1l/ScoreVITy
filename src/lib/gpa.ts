export const GRADES = ['S', 'A', 'B', 'C', 'D', 'E', 'F'] as const;
export type Grade = typeof GRADES[number];

export const CREDITS = [1, 1.5, 2, 3, 4] as const;
export type Credit = typeof CREDITS[number];

export const GRADE_POINTS: Record<Grade, number> = {
  S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0,
};

export const GRADE_COLORS: Record<Grade, string> = {
  S: 'bg-grade-s', A: 'bg-grade-a', B: 'bg-grade-b',
  C: 'bg-grade-c', D: 'bg-grade-d', E: 'bg-grade-e', F: 'bg-grade-f',
};

export interface Course {
  id: string;
  name: string;
  grade: Grade;
  credits: Credit;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

export function calculateGPA(courses: Course[]): number {
  if (courses.length === 0) return 0;
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedSum = courses.reduce((sum, c) => sum + c.credits * GRADE_POINTS[c.grade], 0);
  return weightedSum / totalCredits;
}

export function calculateCGPA(semesters: Semester[]): number {
  const allCourses = semesters.flatMap(s => s.courses);
  return calculateGPA(allCourses);
}

export function createCourse(): Course {
  return { id: crypto.randomUUID(), name: '', grade: 'A', credits: 3 };
}

export function createSemester(index: number): Semester {
  return {
    id: crypto.randomUUID(),
    name: `Semester ${index}`,
    courses: [createCourse()],
  };
}
