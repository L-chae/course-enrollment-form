import { NextResponse } from "next/server";
import { mockDB } from "../_mock/db";
import { delay } from "../_utils/delay";
import type { EnrollmentRequest } from "@/features/enrollment/types/enrollment.types";

export async function POST(request: Request) {
  await delay(1000);

  const body = (await request.json()) as EnrollmentRequest;

  const course = mockDB.courses.find((item) => item.id === body.courseId);

  if (!course) {
    return NextResponse.json(
      {
        code: "INVALID_INPUT",
        message: "존재하지 않는 강의입니다.",
        details: {
          courseId: "존재하지 않는 강의입니다.",
        },
      },
      { status: 400 }
    );
  }

  if (course.currentEnrollment >= course.maxCapacity) {
    return NextResponse.json(
      {
        code: "COURSE_FULL",
        message: "선택한 강의의 정원이 마감되었습니다.",
      },
      { status: 409 }
    );
  }

  const isDuplicate = mockDB.enrollments.some(
    (enrollment) =>
      enrollment.courseId === body.courseId &&
      enrollment.applicantEmail === body.applicant.email
  );

  if (isDuplicate) {
    return NextResponse.json(
      {
        code: "DUPLICATE_ENROLLMENT",
        message: "이미 신청된 강의입니다.",
      },
      { status: 409 }
    );
  }

  if (!body.agreedToTerms) {
    return NextResponse.json(
      {
        code: "INVALID_INPUT",
        message: "입력값을 다시 확인해 주세요.",
        details: {
          agreedToTerms: "이용약관에 동의해야 합니다.",
        },
      },
      { status: 400 }
    );
  }

  const enrollmentId = `ENR-${Date.now()}`;

  mockDB.enrollments.push({
    enrollmentId,
    courseId: body.courseId,
    applicantEmail: body.applicant.email,
    enrolledAt: new Date().toISOString(),
  });

  course.currentEnrollment += body.type === "group" ? body.group.headCount : 1;

  return NextResponse.json({
    enrollmentId,
    status: "confirmed",
    enrolledAt: new Date().toISOString(),
  });
}