interface ReviewSubmitStepProps {
  onPrev: () => void;
  onSuccess: () => void;
}

export function ReviewSubmitStep({ onPrev, onSuccess }: ReviewSubmitStepProps) {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">확인 및 제출</h2>
      <p className="mt-2 text-gray-600">
        입력 내용을 확인하고 최종 제출하는 영역입니다.
      </p>

      <div className="mt-6 rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        다음 단계에서 요약 화면, 약관 동의, 제출 처리를 구현합니다.
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
          onClick={onSuccess}
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          임시 완료
        </button>
      </div>
    </section>
  );
}
