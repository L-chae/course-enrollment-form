interface CourseSelectionStepProps {
  onNext: () => void;
}

export function CourseSelectionStep({ onNext }: CourseSelectionStepProps) {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="text-xl font-semibold">강의 선택</h2>
      <p className="mt-2 text-gray-600">
        수강할 강의와 신청 유형을 선택하는 영역입니다.
      </p>

      <div className="mt-6 rounded-md border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        다음 단계에서 강의 목록 조회와 선택 UI를 구현합니다.
      </div>

      <div className="mt-6 flex justify-end">
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
