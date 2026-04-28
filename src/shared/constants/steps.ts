export const ENROLLMENT_STEPS = [
  { id: 1, title: '강의 선택', description: '원하는 강의를 선택하세요' },
  { id: 2, title: '정보 입력', description: '신청자 정보를 입력하세요' },
  { id: 3, title: '신청 확인', description: '내용을 확인하고 제출하세요' },
] as const;

export type EnrollmentStep = typeof ENROLLMENT_STEPS[number];