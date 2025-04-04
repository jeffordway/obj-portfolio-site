"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/form/Label"; 
import { Text } from "@/components/ui/typography/Text"; 

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | boolean; 
  helperText?: string;
  containerClassName?: string; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type,
      label,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = !!error;
    const errorMessage = typeof error === "string" ? error : undefined;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className="mb-1.5"> 
            {label}
          </Label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError && "border-error focus-visible:ring-error",
            className
          )}
          ref={ref}
          aria-invalid={hasError} 
          aria-describedby={errorMessage ? `${inputId}-error` : undefined}
          {...props}
        />
        {errorMessage && (
          <Text
            variant="caption"
            id={`${inputId}-error`}
            className="mt-1.5 text-error"
            role="alert" 
          >
            {errorMessage}
          </Text>
        )}
        {helperText && !errorMessage && (
          <Text variant="caption" className="mt-1.5 text-foreground/70">
            {helperText}
          </Text>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };