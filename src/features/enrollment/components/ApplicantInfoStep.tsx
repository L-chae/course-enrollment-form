"use client";

import { useEffect, type ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { ParticipantListField } from "../fields/ParticipantListField";
import { TextField } from "../fields/TextField";
import { TextareaField } from "../fields/TextareaField";
import type {
  EnrollmentForm,
  EnrollmentType,
  GroupInfo,
} from "../types/enrollment.types";

const PHONE_REGEX = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-?\d{3,4}-?\d{4})$/;

const DEFAULT_GROUP_VALUE: GroupInfo = {
  organizationName: "",
  headCount: 2,
  participants: [
    { name: "", email: "" },
    { name: "", email: "" },
  ],
  contactPerson: "",
};

function getErrorMessage(error: unknown) {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  if (!("message" in error)) {
    return undefined;
  }

  const message = (error as { message?: unknown }).message;

  if (!message) {
    return undefined;
  }

  return typeof message === "string" ? message : String(message);
}

function getNextParticipants(
  headCount: number,
  currentParticipants: GroupInfo["participants"]
) {
  return Array.from({ length: headCount }, (_, index) => {
    return currentParticipants[index] ?? { name: "", email: "" };
  });
}

function clampHeadCount(value: number) {
  return Math.min(Math.max(value, 2), 10);
}

interface ApplicantInfoStepProps {
  onPrev: () => void;
  onNext: () => void;
}

export function ApplicantInfoStep({ onPrev, onNext }: ApplicantInfoStepProps) {
  const {
    register,
    watch,
    setValue,
    unregister,
    formState: { errors },
  } = useFormContext<EnrollmentForm>();

  const formValues = watch();
  const selectedType = formValues.type;
  const groupValue = selectedType === "group" ? formValues.group : undefined;
  const headCount = groupValue?.headCount ?? DEFAULT_GROUP_VALUE.headCount;
  const participants = groupValue?.participants ?? DEFAULT_GROUP_VALUE.participants;

  useEffect(() => {
    if (selectedType === "group" && !groupValue) {
      setValue("group", DEFAULT_GROUP_VALUE, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [groupValue, selectedType, setValue]);

  const handleTypeChange = (nextType: EnrollmentType) => {
    if (nextType === selectedType) {
      return;
    }

    if (nextType === "group") {
      setValue("type", "group", { shouldDirty: true, shouldTouch: true });

      if (!groupValue) {
        setValue("group", DEFAULT_GROUP_VALUE, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }

      return;
    }

    if (selectedType === "group") {
      const confirmed = window.confirm(
        "단체 신청 정보를 삭제하고 개인 신청으로 전환할까요?"
      );

      if (!confirmed) {
        return;
      }
    }

    unregister("group");
    setValue("type", "personal", { shouldDirty: true, shouldTouch: true });
  };

  const handleHeadCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Number(event.target.value);
    const nextHeadCount = clampHeadCount(
      Number.isFinite(parsedValue) ? parsedValue : DEFAULT_GROUP_VALUE.headCount
    );

    const nextParticipants = getNextParticipants(nextHeadCount, participants);

    setValue("group.headCount", nextHeadCount, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("group.participants", nextParticipants, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const groupErrors = "group" in errors ? errors.group : undefined;
  const participantsError =
    selectedType === "group" ? groupErrors?.participants : undefined;

  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">수강생 정보 입력</h2>
      <p className="mt-2 text-gray-600">
        신청자 정보와 단체 신청 정보를 입력해 주세요.
      </p>

      <div className="mt-6 rounded-lg border bg-gray-50 p-4">
        <h3 className="font-semibold">신청 유형</h3>
        <p className="mt-1 text-sm text-gray-600">
          현재 선택된 신청 유형:{" "}
          <span className="font-medium">
            {selectedType === "personal" ? "개인 신청" : "단체 신청"}
          </span>
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {(["personal", "group"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={[
                "rounded-md border p-3 text-left",
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
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="font-semibold">신청자 정보</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="이름"
            required
            {...register("applicant.name", {
              required: "이름을 입력해 주세요.",
              minLength: { value: 2, message: "이름은 2자 이상 입력해 주세요." },
              maxLength: { value: 20, message: "이름은 20자 이하로 입력해 주세요." },
            })}
            error={getErrorMessage(errors.applicant?.name)}
          />

          <TextField
            label="이메일"
            type="email"
            required
            {...register("applicant.email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식이 올바르지 않습니다.",
              },
            })}
            error={getErrorMessage(errors.applicant?.email)}
          />

          <TextField
            label="전화번호"
            required
            placeholder="01012345678 또는 010-1234-5678"
            {...register("applicant.phone", {
              required: "전화번호를 입력해 주세요.",
              pattern: {
                value: PHONE_REGEX,
                message: "전화번호 형식이 올바르지 않습니다.",
              },
            })}
            error={getErrorMessage(errors.applicant?.phone)}
          />
        </div>

        <TextareaField
          label="수강 동기"
          rows={4}
          maxLength={300}
          {...register("applicant.motivation", {
            maxLength: {
              value: 300,
              message: "수강 동기는 300자 이하로 입력해 주세요.",
            },
          })}
          error={getErrorMessage(errors.applicant?.motivation)}
        />
      </div>

      {selectedType === "group" && (
        <div className="mt-8 space-y-4 rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold">단체 신청 정보</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="단체명"
              required
              {...register("group.organizationName", {
                required: "단체명을 입력해 주세요.",
              })}
              error={getErrorMessage(groupErrors?.organizationName)}
            />

            <TextField
              label="신청 인원수"
              type="number"
              min={2}
              max={10}
              required
              value={headCount}
              onChange={handleHeadCountChange}
              error={getErrorMessage(groupErrors?.headCount)}
            />
          </div>

          <ParticipantListField count={headCount} register={register} errors={errors} />

          {getErrorMessage(participantsError) && (
            <p className="text-sm text-red-600">
              {getErrorMessage(participantsError)}
            </p>
          )}

          <TextField
            label="담당자 연락처"
            required
            placeholder="01012345678 또는 010-1234-5678"
            {...register("group.contactPerson", {
              required: "담당자 연락처를 입력해 주세요.",
              pattern: {
                value: PHONE_REGEX,
                message: "담당자 연락처 형식이 올바르지 않습니다.",
              },
            })}
            error={getErrorMessage(groupErrors?.contactPerson)}
          />
        </div>
      )}

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
          onClick={onNext}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          다음
        </button>
      </div>
    </section>
  );
}
