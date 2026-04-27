import { z } from "zod";
import { applicantSchema, groupSchema } from "./enrollment.schema";

export const courseStepSchema = z.object({
  courseId: z.string().min(1, "강의를 선택해 주세요."),
  type: z.enum(["personal", "group"], {
    message: "신청 유형을 선택해 주세요.",
  }),
});

export const personalApplicantStepSchema = z.object({
  type: z.literal("personal"),
  applicant: applicantSchema,
});

export const groupApplicantStepSchema = z.object({
  type: z.literal("group"),
  applicant: applicantSchema,
  group: groupSchema,
});

export const applicantStepSchema = z.discriminatedUnion("type", [
  personalApplicantStepSchema,
  groupApplicantStepSchema,
]);

export const reviewStepSchema = z.object({
  agreedToTerms: z.literal(true, {
    message: "이용약관에 동의해 주세요.",
  }),
});
