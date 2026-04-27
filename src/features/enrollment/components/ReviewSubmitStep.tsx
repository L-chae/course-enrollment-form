"use client";

import { useMemo, useState } from "react";
import { useFormContext, type FieldPath } from "react-hook-form";
import { EnrollmentApiError } from "../api/enrollmentApi";
import { useSubmitEnrollmentMutation } from "../api/useSubmitEnrollmentMutation";
import { useCoursesQuery } from "../api/useCoursesQuery";
import type { EnrollmentStep } from "../constants/steps";
import type { EnrollmentForm, EnrollmentResponse } from "../types/enrollment.types";
import { buildEnrollmentPayload } from "../utils/buildEnrollmentPayload";
import { formatDateRange } from "../utils/formatDateRange";
import { formatPrice } from "../utils/formatPrice";
import { getServerErrorMessage } from "../utils/mapServerError";

interface ReviewSubmitStepProps {
  onPrev: () => void;
  onEditStep: (step: EnrollmentStep) => void;
  onSuccess: (result: EnrollmentResponse) => void;
}

export function ReviewSubmitStep({
  onPrev,
  onEditStep,
  onSuccess,
}: ReviewSubmitStepProps) {
  const submitMutation = useSubmitEnrollmentMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    watch,
    register,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<EnrollmentForm>();

  const values = watch();
  const { data } = useCoursesQuery("all");

  const selectedCourse = useMemo(() => {
    return data?.courses.find((course) => course.id === values.courseId);
  }, [data?.courses, values.courseId]);

  const applicant = values.applicant;

  const handleSubmit = async () => {
    setSubmitError(null);

    const isValid = await trigger(["agreedToTerms"], {
      shouldFocus: true,
    });

    if (!isValid) {
      return;
    }

    try {
      const payload = buildEnrollmentPayload(getValues());
      const result = await submitMutation.mutateAsync(payload);
      onSuccess(result);
    } catch (error) {
      if (error instanceof EnrollmentApiError) {
        const serverError = error.data;
        setSubmitError(getServerErrorMessage(serverError));

        if (serverError.code === "INVALID_INPUT" && serverError.details) {
          Object.entries(serverError.details).forEach(([field, message]) => {
            setError(field as FieldPath<EnrollmentForm>, {
              type: "server",
              message,
            });
          });
        }

        if (serverError.code === "COURSE_FULL") {
          onEditStep(1);
        }

        return;
      }

      setSubmitError("신청 처리 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <section className="rounded-lg border bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold">확인 및 제출</h2>
        <p className="mt-2 text-gray-600">입력한 내용을 확인한 뒤 제출해 주세요.</p>
      </div>

      <div className="mt-6 space-y-4">
        <section className="rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold">강의 정보</h3>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-sm underline"
            >
              수정
            </button>
          </div>

          {selectedCourse ? (
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div>
                <dt className="inline font-medium text-gray-900">강의명: </dt>
                <dd className="inline">{selectedCourse.title}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">강사: </dt>
                <dd className="inline">{selectedCourse.instructor}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">가격: </dt>
                <dd className="inline">{formatPrice(selectedCourse.price)}원</dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">일정: </dt>
                <dd className="inline">
                  {formatDateRange(selectedCourse.startDate, selectedCourse.endDate)}
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">신청 유형: </dt>
                <dd className="inline">
                  {values.type === "personal" ? "개인 신청" : "단체 신청"}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm text-red-600">
              선택한 강의 정보를 찾을 수 없습니다.
            </p>
          )}
        </section>

        <section className="rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold">신청자 정보</h3>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-sm underline"
            >
              수정
            </button>
          </div>

          <dl className="mt-3 space-y-2 text-sm text-gray-700">
            <div>
              <dt className="inline font-medium text-gray-900">이름: </dt>
              <dd className="inline">{applicant.name || "-"}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-900">이메일: </dt>
              <dd className="inline">{applicant.email || "-"}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-900">전화번호: </dt>
              <dd className="inline">{applicant.phone || "-"}</dd>
            </div>
            <div>
              <dt className="inline font-medium text-gray-900">수강 동기: </dt>
              <dd className="inline">{applicant.motivation || "-"}</dd>
            </div>
          </dl>
        </section>

        {values.type === "group" && values.group && (
          <section className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold">단체 신청 정보</h3>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-sm underline"
              >
                수정
              </button>
            </div>

            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div>
                <dt className="inline font-medium text-gray-900">단체명: </dt>
                <dd className="inline">{values.group.organizationName || "-"}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">신청 인원: </dt>
                <dd className="inline">{values.group.headCount}명</dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-900">담당자 연락처: </dt>
                <dd className="inline">{values.group.contactPerson || "-"}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">참가자 명단</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {values.group.participants.map((participant, index) => (
                  <li
                    key={`${participant.email}-${index}`}
                    className="rounded-md bg-gray-50 p-3"
                  >
                    참가자 {index + 1}: {participant.name || "-"} /{" "}
                    {participant.email || "-"}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="rounded-lg border p-4">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              {...register("agreedToTerms")}
              aria-invalid={Boolean(errors.agreedToTerms)}
              data-invalid={Boolean(errors.agreedToTerms) || undefined}
            />
            <span>
              이용약관 및 개인정보 처리방침에 동의합니다.
              <span className="ml-1 text-red-500">*</span>
            </span>
          </label>

          {errors.agreedToTerms?.message && (
            <p className="mt-2 text-sm text-red-600">
              {errors.agreedToTerms.message.toString()}
            </p>
          )}
        </section>

        {submitError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-md border px-4 py-2"
        >
          이전
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitMutation.isPending}
          className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitMutation.isPending ? "제출 중..." : "제출하기"}
        </button>
      </div>
    </section>
  );
}
