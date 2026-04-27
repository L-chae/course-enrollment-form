import { ENROLLMENT_STEPS, type EnrollmentStep } from "../constants/steps";

interface StepIndicatorProps {
  currentStep: EnrollmentStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {ENROLLMENT_STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <li
            key={step.id}
            className={[
              "rounded-lg border p-4",
              isActive
                ? "border-black bg-black text-white"
                : isCompleted
                  ? "border-gray-300 bg-gray-100 text-gray-700"
                  : "border-gray-200 bg-white text-gray-500",
            ].join(" ")}
          >
            <div className="text-sm font-semibold">Step {step.id}</div>
            <div className="mt-1 font-medium">{step.title}</div>
            <div className="mt-1 text-sm opacity-80">{step.description}</div>
          </li>
        );
      })}
    </ol>
  );
}
