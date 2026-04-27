# course-enrollment-form

온라인 교육 플랫폼의 수강 신청 흐름을 구현한 FE 과제 프로젝트입니다.

## 프로젝트 개요

Next.js App Router 기반으로 강의 선택, 신청자 정보 입력, 확인 및 제출까지 이어지는 멀티스텝 수강 신청 폼을 구현합니다.

주요 구현 목표는 다음과 같습니다.

- 강의 목록 조회 및 카테고리 필터링
- 개인 / 단체 신청 분기
- 단체 신청 조건부 필드 처리
- 스텝별 유효성 검증
- 제출 성공 / 실패 처리
- 입력 데이터 유지
- Mock API 기반 실행 환경 구성

## 기술 스택

- Next.js App Router
- TypeScript
- React
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Next.js Route Handler 기반 Mock API
- Vitest / React Testing Library 예정

## 실행 방법

```bash
npm install
npm run dev