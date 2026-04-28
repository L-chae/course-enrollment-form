# Course Enrollment Form

Next.js 기반의 온라인 교육 플랫폼 수강 신청 프론트엔드 프로젝트입니다.

## 🚀 주요 기능
- **3단계 멀티스텝 폼** (`/enrollment`): 강의 선택 ➔ 정보 입력(개인/단체 조건부) ➔ 최종 확인 및 동의
- **자동 저장**: `localStorage`를 활용해 작성 중인 데이터를 임시 저장 및 복원
- **에러 핸들링**: 정원 초과, 중복 신청 등 Mock API의 에러 코드를 사용자 친화적 메시지로 매핑

## 🛠 기술 스택
- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **UI**: Tailwind CSS 4
- **Form & Validation**: React Hook Form, Zod
- **State Management**: TanStack Query
- **Mocking**: Next.js Route Handlers

## 💻 실행 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

## 🧠 주요 설계 및 가정
- **단계별 폼 검증**: UX 향상을 위해 한 번에 전체를 검증하지 않고, 현재 단계(`Step`)에 필요한 필드만 검증합니다.
- **조건부 스키마**: Zod의 `discriminatedUnion`을 활용해 개인/단체 신청에 따른 입력 필드와 검증 규칙을 안전하게 분리했습니다.
- **비즈니스 로직 적용**: 
  - 단체 신청은 2~10명으로 제한하며, 입력한 인원수와 참가자 명단 수가 일치하도록 검증합니다.
  - 동일 이메일의 중복 신청을 차단하고, 정원 마감 여부는 제출 시점 서버 기준으로 재확인합니다.
- **Mock API 구현**: 실제 백엔드 없이도 네트워크 지연 및 예외 상황을 테스트할 수 있도록 서버 로직을 앱 내부에 구성했습니다.

## 📌 제약 사항
- 메모리 기반 Mock DB를 사용하여 서버 재시작 시 데이터가 초기화됩니다.
- 인증/인가, 결제 연동 및 동시성 제어(락/트랜잭션)는 구현 범위에서 제외되었습니다.
- 테스트 코드(Vitest/RTL)는 포함되어 있지 않습니다.

---
*💡 참고: 본 프로젝트의 UI 리팩토링 및 문서 구조화에는 AI 도구가 보조적으로 활용되었습니다.*