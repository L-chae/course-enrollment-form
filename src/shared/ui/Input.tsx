import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && <label className="text-sm font-bold text-text-sub ml-0.5">{label}</label>}
                <input
                    ref={ref}
                    className={`input-standard ${error ? "border-red-500" : ""} ${className}`}
                    {...props}
                />
                {error && <span className="text-xs text-red-500 mt-1 ml-0.5 font-medium">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";