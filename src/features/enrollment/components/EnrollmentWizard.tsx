"use client";

export function EnrollmentWizard() {
  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">수강 신청</h1>
      <p className="mt-2 text-gray-600">
        수강 신청 멀티스텝 폼을 구현할 영역입니다.
      </p>

      <div className="mt-6 rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        Step 1. 강의 선택 화면이 여기에 구현됩니다.
      </div>
    </section>
  );
}