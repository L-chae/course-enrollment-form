import type { ErrorResponse } from "../types/enrollment.types";

export function getServerErrorMessage(error: ErrorResponse) {
  switch (error.code) {
    case "COURSE_FULL":
      return "선택한 강의의 정원이 마감되었습니다. 다른 강의를 선택해 주세요.";
    case "DUPLICATE_ENROLLMENT":
      return "이미 신청된 강의입니다. 신청 정보를 확인해 주세요.";
    case "INVALID_INPUT":
      return "입력값을 다시 확인해 주세요.";
    default:
      return "신청 처리 중 문제가 발생했습니다. 다시 시도해 주세요.";
  }
}
