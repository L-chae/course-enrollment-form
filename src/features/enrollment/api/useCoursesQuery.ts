import { useQuery } from "@tanstack/react-query";
import { getCourses } from "./courseApi";
import type { CourseCategory } from "../types/course.types";

export function useCoursesQuery(category?: CourseCategory | "all") {
  return useQuery({
    queryKey: ["courses", category],
    queryFn: () => getCourses(category),
  });
}