import type { TextareaHTMLAttributes } from "react";

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextareaField({
  label,
  error,
  required,
  id,
  ...props
}: TextareaFieldProps) {
  const textareaId = id ?? props.name;

  return (
    <div>
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-gray-800"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
        id={textareaId}
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
