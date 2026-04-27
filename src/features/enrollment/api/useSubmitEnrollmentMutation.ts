import { useMutation } from "@tanstack/react-query";
import { submitEnrollment } from "./enrollmentApi";

export function useSubmitEnrollmentMutation() {
  return useMutation({
    mutationFn: submitEnrollment,
  });
}