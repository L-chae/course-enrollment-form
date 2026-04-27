"use client";

import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCoursesQuery } from "../api/useCoursesQuery";
import type { Course, CourseCategory } from "../types/course.types";
import type { EnrollmentForm, EnrollmentType } from "../types/enrollment.types";
import {
  getCourseCapacityStatus,
  getRemainingSeats,
} from "../utils/getCourseCapacityStatus";

interface CourseSelectionStepProps {
  onNext: () => void | Promise<void>;
}

type CategoryFilter = CourseCategory | "all";

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: "전체",
  development: "개발",
  design: "디자인",
  marketing: "마케팅",
  business: "비즈니스",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export function CourseSelectionStep({ onNext }: CourseSelectionStepProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const { data, isLoading, isError, refetch } = useCoursesQuery(category);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EnrollmentForm>();

  const selectedCourseId = watch("courseId");
  const selectedType = watch("type");

  const selectedCourse = useMemo(() => {
    return data?.courses.find((course) => course.id === selectedCourseId);
  }, [data?.courses, selectedCourseId]);

  const handleSelectCourse = (course: Course) => {
    const status = getCourseCapacityStatus(
      course.maxCapacity,
      course.currentEnrollment
    );

    if (status === "full") {
      return;
    }

    setValue("courseId", course.id, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSelectType = (type: EnrollmentType) => {
    setValue("type", type, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <section className="rounded-lg border bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold">강의 선택</h2>
        <p className="mt-2 text-gray-600">
          수강할 강의와 신청 유형을 선택해 주세요.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={[
              "rounded-full border px-4 py-2 text-sm",
              category === item
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-700",
            ].join(" ")}
          >
            {CATEGORY_LABELS[item]}
          </button>
        ))}
      </div>
      {errors.courseId?.message && (
        <p className="mt-2 text-sm text-red-600">{errors.courseId.message}</p>
      )}

      <div
        className="mt-6"
        data-invalid={errors.courseId ? true : undefined}
        tabIndex={errors.courseId ? -1 : undefined}
      >
        {isLoading && (
          <div className="rounded-md border border-dashed p-6 text-gray-500">
            강의 목록을 불러오는 중입니다.
          </div>
        )}

        {isError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-700">
              강의 목록을 불러오지 못했습니다.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-md border border-red-300 px-3 py-1 text-sm text-red-700"
            >
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !isError && data?.courses.length === 0 && (
          <div className="rounded-md border border-dashed p-6 text-gray-500">
            현재 선택 가능한 강의가 없습니다.
          </div>
        )}

        {!isLoading && !isError && data && data.courses.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {data.courses.map((course) => {
              const status = getCourseCapacityStatus(
                course.maxCapacity,
                course.currentEnrollment
              );
              const remainingSeats = getRemainingSeats(
                course.maxCapacity,
                course.currentEnrollment
              );
              const isSelected = course.id === selectedCourseId;
              const isFull = status === "full";

              return (
                <button
                  key={course.id}
                  type="button"
                  disabled={isFull}
                  onClick={() => handleSelectCourse(course)}
                  className={[
                    "rounded-lg border p-4 text-left transition",
                    isSelected
                      ? "border-black bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-400",
                    isFull ? "cursor-not-allowed opacity-50" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {course.description}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {CATEGORY_LABELS[course.category]}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-1 text-sm text-gray-600">
                    <div>
                      <dt className="inline font-medium text-gray-800">
                        강사:{" "}
                      </dt>
                      <dd className="inline">{course.instructor}</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-gray-800">
                        가격:{" "}
                      </dt>
                      <dd className="inline">{formatPrice(course.price)}원</dd>
                    </div>
                    <div>
                      <dt className="inline font-medium text-gray-800">
                        일정:{" "}
                      </dt>
                      <dd className="inline">
                        {formatDate(course.startDate)} ~{" "}
                        {formatDate(course.endDate)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 text-sm">
                    {status === "full" && (
                      <span className="font-medium text-red-600">정원 마감</span>
                    )}
                    {status === "limited" && (
                      <span className="font-medium text-orange-600">
                        마감 임박 · 잔여 {remainingSeats}석
                      </span>
                    )}
                    {status === "available" && (
                      <span className="text-gray-600">잔여 {remainingSeats}석</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg border bg-gray-50 p-4">
        <h3 className="font-semibold">신청 유형</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(["personal", "group"] as EnrollmentType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelectType(type)}
              className={[
                "rounded-md border p-4 text-left",
                selectedType === type
                  ? "border-black bg-white"
                  : "border-gray-200 bg-white text-gray-600",
              ].join(" ")}
            >
              <div className="font-medium">
                {type === "personal" ? "개인 신청" : "단체 신청"}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {type === "personal"
                  ? "본인 1명이 수강 신청합니다."
                  : "2~10명의 참가자를 함께 신청합니다."}
              </p>
            </button>
          ))}
        </div>
        {errors.type?.message && (
          <p className="mt-3 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {selectedCourse && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="font-semibold">선택한 강의</h3>
          <p className="mt-2 text-gray-700">{selectedCourse.title}</p>
          <p className="mt-1 text-sm text-gray-500">
            {formatDate(selectedCourse.startDate)} ~{" "}
            {formatDate(selectedCourse.endDate)} ·{" "}
            {formatPrice(selectedCourse.price)}원 · {selectedCourse.instructor} · 잔여{" "}
            {getRemainingSeats(
              selectedCourse.maxCapacity,
              selectedCourse.currentEnrollment
            )}
            석
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          다음
        </button>
      </div>
    </section>
  );
}
