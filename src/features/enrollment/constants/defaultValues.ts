import type { EnrollmentForm } from "../types/enrollment.types";

export const DEFAULT_ENROLLMENT_FORM_VALUES: EnrollmentForm = {
  courseId: "",
  type: "personal",
  applicant: {
    name: "",
    email: "",
    phone: "",
    motivation: "",
  },
  agreedToTerms: false,
};
