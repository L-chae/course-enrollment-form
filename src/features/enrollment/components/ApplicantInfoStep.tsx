interface ApplicantInfoStepProps {
  onPrev: () => void;
  onNext: () => void;
}

export function ApplicantInfoStep({ onPrev, onNext }: ApplicantInfoStepProps) {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">수강생 정보 입력</h2>
      <p className="mt-2 text-gray-600">
        신청자 정보와 단체 신청 정보를 입력하는 영역입니다.
      </p>

      <div className="mt-6 rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        다음 단계에서 공통 필드와 조건부 단체 필드를 구현합니다.
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-md border px-4 py-2"
        >
          이전
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          다음
        </button>
      </div>
    </section>
  );
}
