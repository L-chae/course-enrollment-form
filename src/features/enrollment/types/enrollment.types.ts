export type EnrollmentType = "personal" | "group";

export interface Applicant {
  name: string;
  email: string;
  phone: string;
  motivation?: string;
}

export interface Participant {
  name: string;
  email: string;
}

export interface GroupInfo {
  organizationName: string;
  headCount: number;
  participants: Participant[];
  contactPerson: string;
}

export interface BaseEnrollmentForm {
  courseId: string;
  type: EnrollmentType;
  applicant: Applicant;
  agreedToTerms: boolean;
}

export interface PersonalEnrollmentForm extends BaseEnrollmentForm {
  type: "personal";
}

export interface GroupEnrollmentForm extends BaseEnrollmentForm {
  type: "group";
  group: GroupInfo;
}

export type EnrollmentForm = PersonalEnrollmentForm | GroupEnrollmentForm;

export interface PersonalEnrollmentRequest {
  courseId: string;
  type: "personal";
  applicant: Applicant;
  agreedToTerms: boolean;
}

export interface GroupEnrollmentRequest {
  courseId: string;
  type: "group";
  applicant: Applicant;
  group: GroupInfo;
  agreedToTerms: boolean;
}

export type EnrollmentRequest =
  | PersonalEnrollmentRequest
  | GroupEnrollmentRequest;

export interface EnrollmentResponse {
  enrollmentId: string;
  status: "confirmed" | "pending";
  enrolledAt: string;
}

export interface ErrorResponse {
  code: "COURSE_FULL" | "DUPLICATE_ENROLLMENT" | "INVALID_INPUT" | "UNKNOWN";
  message: string;
  details?: Record<string, string>;
}