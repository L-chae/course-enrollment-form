import type { EnrollmentResponse } from "../types/enrollment.types";

interface EnrollmentSuccessProps {
  result: EnrollmentResponse;
  onRestart: () => void;
}

export function EnrollmentSuccess({ result, onRestart }: EnrollmentSuccessProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">수강 신청 완료</h1>
      <p className="mt-2 text-gray-600">
        수강 신청이 정상적으로 접수되었습니다.
      </p>

      <dl className="mt-6 space-y-3 rounded-lg border bg-gray-50 p-4 text-sm">
        <div>
          <dt className="font-medium text-gray-900">신청 번호</dt>
          <dd className="mt-1 text-gray-700">{result.enrollmentId}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">상태</dt>
          <dd className="mt-1 text-gray-700">
            {result.status === "confirmed" ? "신청 확정" : "대기"}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-900">신청 일시</dt>
          <dd className="mt-1 text-gray-700">
            {new Intl.DateTimeFormat("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(result.enrolledAt))}
          </dd>
        </div>
      </dl>

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
