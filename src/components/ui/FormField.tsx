import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: ReactNode;
  htmlFor: string;
  children: ReactNode;
  error?: string | null;
  hint?: string | null;
  className?: string;
};

export function FormField({ label, htmlFor, children, error, hint, className }: FormFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={htmlFor} className="analyze-label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="analyze-field-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="analyze-field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
