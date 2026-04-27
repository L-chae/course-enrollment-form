export function focusFirstError() {
  window.requestAnimationFrame(() => {
    const errorElement = document.querySelector(
      '[aria-invalid="true"], [data-invalid="true"]'
    );

    if (errorElement instanceof HTMLElement) {
      errorElement.focus();
      errorElement.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  });
}
