export const ENROLLMENT_STEPS = [
  {
    id: 1,
    title: "강의 선택",
    description: "수강할 강의와 신청 유형을 선택합니다.",
  },
  {
    id: 2,
    title: "정보 입력",
    description: "수강생 정보를 입력합니다.",
  },
  {
    id: 3,
    title: "확인 및 제출",
    description: "입력 내용을 확인하고 제출합니다.",
  },
] as const;

export type EnrollmentStep = (typeof ENROLLMENT_STEPS)[number]["id"];
