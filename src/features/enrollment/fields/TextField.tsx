import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextField({
  label,
  error,
  required,
  id,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        data-invalid={Boolean(error) || undefined}
        className={[
          "mt-2 w-full rounded-md border px-3 py-2 outline-none",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-300 focus:border-black",
        ].join(" ")}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
