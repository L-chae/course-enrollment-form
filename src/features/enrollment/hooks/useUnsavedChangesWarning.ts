import { useEffect } from "react";

interface UseUnsavedChangesWarningParams {
  enabled: boolean;
}

export function useUnsavedChangesWarning({
  enabled,
}: UseUnsavedChangesWarningParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled]);
}
