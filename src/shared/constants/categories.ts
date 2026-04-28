export const COURSE_CATEGORIES = {
  DEVELOPMENT: 'Development',
  DESIGN: 'Design',
  MARKETING: 'Marketing',
  BUSINESS: 'Business',
} as const;

export type CourseCategory = typeof COURSE_CATEGORIES[keyof typeof COURSE_CATEGORIES];