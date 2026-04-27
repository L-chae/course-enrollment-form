import type { FieldPath } from "react-hook-form";
import type { EnrollmentStep } from "../constants/steps";
import type { EnrollmentForm } from "../types/enrollment.types";

export function getStepValidationFields(
  step: EnrollmentStep,
  type: EnrollmentForm["type"]
): FieldPath<EnrollmentForm>[] {
  if (step === 1) {
    return ["courseId", "type"];
  }

  if (step === 2) {
    const commonFields: FieldPath<EnrollmentForm>[] = [
      "applicant.name",
      "applicant.email",
      "applicant.phone",
      "applicant.motivation",
    ];

    if (type === "group") {
      return [
        ...commonFields,
        "group.organizationName",
        "group.headCount",
        "group.participants",
        "group.contactPerson",
      ] as FieldPath<EnrollmentForm>[];
    }

    return commonFields;
  }

  if (step === 3) {
    return ["agreedToTerms"];
  }

  return [];
}
