import type { CourseCategory, CourseListResponse } from "../types/course.types";

export async function getCourses(
  category?: CourseCategory | "all"
): Promise<CourseListResponse> {
  const params = category && category !== "all" ? `?category=${category}` : "";
  const response = await fetch(`/api/courses${params}`);

  if (!response.ok) {
    throw new Error("강의 목록을 불러오지 못했습니다.");
  }

  return response.json();
}