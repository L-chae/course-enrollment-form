import { mockCourses } from "@/mocks/courses";
import type { Course } from "@/features/enrollment/types/course.types";

type MockEnrollment = {
  enrollmentId: string;
  courseId: string;
  applicantEmail: string;
  enrolledAt: string;
};

type MockDB = {
  courses: Course[];
  enrollments: MockEnrollment[];
};

declare global {
  // eslint-disable-next-line no-var
  var __courseEnrollmentMockDB: MockDB | undefined;
}

export const mockDB: MockDB =
  globalThis.__courseEnrollmentMockDB ??
  (globalThis.__courseEnrollmentMockDB = {
    courses: [...mockCourses],
    enrollments: [],
  });