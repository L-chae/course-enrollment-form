"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { EnrollmentStep } from "../constants/steps";
import { useEnrollmentForm } from "../hooks/useEnrollmentForm";
import { ApplicantInfoStep } from "./ApplicantInfoStep";
import { CourseSelectionStep } from "./CourseSelectionStep";
import { EnrollmentSuccess } from "./EnrollmentSuccess";
import { ReviewSubmitStep } from "./ReviewSubmitStep";
import { StepIndicator } from "./StepIndicator";
import { focusFirstError } from "../utils/focusFirstError";
import { getStepValidationFields } from "../utils/getStepValidationFields";
import type { EnrollmentResponse } from "../types/enrollment.types";
import { usePersistedEnrollmentForm } from "../hooks/usePersistedEnrollmentForm";
import { useUnsavedChangesWarning } from "../hooks/useUnsavedChangesWarning";

export function EnrollmentWizard() {
  const methods = useEnrollmentForm();
  const { clearDraft } = usePersistedEnrollmentForm(methods);
  const [queryClient] = useState(() => new QueryClient());
  const [currentStep, setCurrentStep] = useState<EnrollmentStep>(1);
  const [enrollmentResult, setEnrollmentResult] =
    useState<EnrollmentResponse | null>(null);

  useUnsavedChangesWarning({
    enabled: methods.formState.isDirty && !enrollmentResult,
  });

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as EnrollmentStep);
  };

  const goToStep = (step: EnrollmentStep) => {
    setCurrentStep(step);
  };

  const goToNextStep = async () => {
    const type = methods.getValues("type");
    const fields = getStepValidationFields(currentStep, type);

    const isValid = await methods.trigger(fields, {
      shouldFocus: true,
    });

    if (!isValid) {
      focusFirstError();
      return;
    }

    setCurrentStep((prev) => Math.min(3, prev + 1) as EnrollmentStep);
  };

  const restart = () => {
    clearDraft();
    methods.reset();
    setCurrentStep(1);
    setEnrollmentResult(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {enrollmentResult ? (
        <EnrollmentSuccess result={enrollmentResult} onRestart={restart} />
      ) : (
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
                onEditStep={goToStep}
                onSuccess={(result) => {
                  clearDraft();
                  setEnrollmentResult(result);
                }}
              />
            )}
          </section>
        </FormProvider>
      )}
    </QueryClientProvider>
  );
}
