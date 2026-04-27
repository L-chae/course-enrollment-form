import type {
  EnrollmentForm,
  EnrollmentRequest,
} from "../types/enrollment.types";

export function buildEnrollmentPayload(values: EnrollmentForm): EnrollmentRequest {
  if (values.type === "group") {
    return {
      courseId: values.courseId,
      type: "group",
      applicant: values.applicant,
      group: values.group,
      agreedToTerms: values.agreedToTerms,
    };
  }

  return {
    courseId: values.courseId,
    type: "personal",
    applicant: values.applicant,
    agreedToTerms: values.agreedToTerms,
  };
}
