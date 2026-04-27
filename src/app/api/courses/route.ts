import { NextResponse } from "next/server";
import { mockDB } from "../_mock/db";
import { delay } from "../_utils/delay";
import type { CourseCategory } from "@/features/enrollment/types/course.types";

export async function GET(request: Request) {
  await delay(700);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as CourseCategory | null;

  const courses = category
    ? mockDB.courses.filter((course) => course.category === category)
    : mockDB.courses;

  const categories: CourseCategory[] = [
    "development",
    "design",
    "marketing",
    "business",
  ];

  return NextResponse.json({
    courses,
    categories,
  });
}