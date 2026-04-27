import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DEFAULT_ENROLLMENT_FORM_VALUES } from "../constants/defaultValues";
import { enrollmentSchema } from "../schemas/enrollment.schema";
import type { EnrollmentForm } from "../types/enrollment.types";

export function useEnrollmentForm() {
  return useForm<EnrollmentForm>({
    defaultValues: DEFAULT_ENROLLMENT_FORM_VALUES,
    resolver: zodResolver(enrollmentSchema),
    mode: "onBlur",
  });
}
