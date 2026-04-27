import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { EnrollmentForm } from "../types/enrollment.types";

const STORAGE_KEY = "course-enrollment-form-draft";

export function usePersistedEnrollmentForm(
  methods: UseFormReturn<EnrollmentForm>
) {
  const isRestoredRef = useRef(false);

  useEffect(() => {
    if (isRestoredRef.current) {
      return;
    }

    const savedDraft = window.localStorage.getItem(STORAGE_KEY);

    if (savedDraft) {
      try {
        methods.reset(JSON.parse(savedDraft));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    isRestoredRef.current = true;
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (!isRestoredRef.current) {
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const clearDraft = () => {
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return {
    clearDraft,
  };
}
