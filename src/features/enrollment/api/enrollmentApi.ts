import type {
  EnrollmentRequest,
  EnrollmentResponse,
  ErrorResponse,
} from "../types/enrollment.types";

export class EnrollmentApiError extends Error {
  status: number;
  data: ErrorResponse;

  constructor(status: number, data: ErrorResponse) {
    super(data.message);
    this.status = status;
    this.data = data;
  }
}

export async function submitEnrollment(
  payload: EnrollmentRequest
): Promise<EnrollmentResponse> {
  const response = await fetch("/api/enrollments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ErrorResponse;
    throw new EnrollmentApiError(response.status, errorData);
  }

  return response.json();
}