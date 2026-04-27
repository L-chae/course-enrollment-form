interface EnrollmentSuccessProps {
  onRestart: () => void;
}

export function EnrollmentSuccess({ onRestart }: EnrollmentSuccessProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">수강 신청 완료</h1>
      <p className="mt-2 text-gray-600">
        수강 신청 완료 화면입니다. 이후 실제 신청 번호와 요약 정보를 표시합니다.
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        새 신청하기
      </button>
    </section>
  );
}
