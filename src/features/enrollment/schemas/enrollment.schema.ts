import { z } from "zod";

const phoneRegex = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-?\d{3,4}-?\d{4})$/;

export const applicantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름은 2자 이상 입력해 주세요.")
    .max(20, "이름은 20자 이하로 입력해 주세요."),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .email("이메일 형식이 올바르지 않습니다."),
  phone: z
    .string()
    .trim()
    .min(1, "전화번호를 입력해 주세요.")
    .regex(phoneRegex, "전화번호 형식이 올바르지 않습니다."),
  motivation: z
    .string()
    .max(300, "수강 동기는 300자 이하로 입력해 주세요.")
    .optional()
    .or(z.literal("")),
});

export const participantSchema = z.object({
  name: z.string().trim().min(1, "참가자 이름을 입력해 주세요."),
  email: z
    .string()
    .trim()
    .min(1, "참가자 이메일을 입력해 주세요.")
    .email("참가자 이메일 형식이 올바르지 않습니다."),
});

export const groupSchema = z
  .object({
    organizationName: z.string().trim().min(1, "단체명을 입력해 주세요."),
    headCount: z
      .number({
        message: "신청 인원수를 입력해 주세요.",
      })
      .int("신청 인원수는 정수여야 합니다.")
      .min(2, "단체 신청은 최소 2명부터 가능합니다.")
      .max(10, "단체 신청은 최대 10명까지 가능합니다."),
    participants: z
      .array(participantSchema)
      .min(2, "참가자는 최소 2명 이상 입력해야 합니다.")
      .max(10, "참가자는 최대 10명까지 입력할 수 있습니다."),
    contactPerson: z
      .string()
      .trim()
      .min(1, "담당자 연락처를 입력해 주세요.")
      .regex(phoneRegex, "담당자 연락처 형식이 올바르지 않습니다."),
  })
  .superRefine((group, ctx) => {
    if (group.participants.length !== group.headCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["participants"],
        message: "신청 인원수와 참가자 명단 수가 일치해야 합니다.",
      });
    }

    const emailMap = new Map<string, number>();

    group.participants.forEach((participant, index) => {
      const email = participant.email.trim().toLowerCase();

      if (!email) {
        return;
      }

      if (emailMap.has(email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["participants", index, "email"],
          message: "참가자 이메일은 중복될 수 없습니다.",
        });
      }

      emailMap.set(email, index);
    });
  });

export const personalEnrollmentSchema = z.object({
  courseId: z.string().min(1, "강의를 선택해 주세요."),
  type: z.literal("personal"),
  applicant: applicantSchema,
  agreedToTerms: z.boolean(),
});

export const groupEnrollmentSchema = z.object({
  courseId: z.string().min(1, "강의를 선택해 주세요."),
  type: z.literal("group"),
  applicant: applicantSchema,
  group: groupSchema,
  agreedToTerms: z.boolean(),
});

export const enrollmentSchema = z.discriminatedUnion("type", [
  personalEnrollmentSchema,
  groupEnrollmentSchema,
]);

export type EnrollmentSchema = z.infer<typeof enrollmentSchema>;
