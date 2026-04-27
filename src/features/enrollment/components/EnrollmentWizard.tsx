"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import type { EnrollmentStep } from "../constants/steps";
import { useEnrollmentForm } from "../hooks/useEnrollmentForm";
import { ApplicantInfoStep } from "./ApplicantInfoStep";
import { CourseSelectionStep } from "./CourseSelectionStep";
import { EnrollmentSuccess } from "./EnrollmentSuccess";
import { ReviewSubmitStep } from "./ReviewSubmitStep";
import { StepIndicator } from "./StepIndicator";

export function EnrollmentWizard() {
  const methods = useEnrollmentForm();
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as EnrollmentStep);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(3, prev + 1) as EnrollmentStep);
  };

  const restart = () => {
    methods.reset();
    setCurrentStep(1);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return <EnrollmentSuccess onRestart={restart} />;
  }

  return (
    <FormProvider {...methods}>
      <section className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">수강 신청</h1>
          <p className="mt-2 text-gray-600">
            강의 선택부터 신청 제출까지 단계별로 진행합니다.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && <CourseSelectionStep onNext={goToNextStep} />}

        {currentStep === 2 && (
          <ApplicantInfoStep onPrev={goToPrevStep} onNext={goToNextStep} />
        )}

        {currentStep === 3 && (
          <ReviewSubmitStep
            onPrev={goToPrevStep}
            onSuccess={() => setIsCompleted(true)}
          />
        )}
      </section>
    </FormProvider>
  );
}
