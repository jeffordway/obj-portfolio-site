"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/form/Label";
import { Text } from "@/components/ui/typography/Text";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | boolean;
  helperText?: string;
  containerClassName?: string;
  rows?: number;
  showCharCount?: boolean;
  characterLimit?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      helperText,
      id,
      rows = 5,
      maxLength,
      characterLimit,
      showCharCount = !!(maxLength || characterLimit),
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    // Track character count for controlled and uncontrolled components
    const [charCount, setCharCount] = React.useState(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });
    
    // Determine if we're over the limit (for styling and validation)
    const limit = characterLimit || maxLength;
    const isOverLimit = limit ? charCount > limit : false;
    
    // Combine provided error with character limit error
    const hasError = !!error || isOverLimit;
    let errorMessage = typeof error === "string" ? error : undefined;
    if (isOverLimit && !errorMessage) {
      errorMessage = `Message exceeds maximum length of ${limit} characters`;
    }
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <Label htmlFor={textareaId} className="mb-1.5">
            {label}
          </Label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          className={cn(
            "flex min-h-[80px] w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "placeholder:text-muted-foreground",
            // Focus Visible state
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Error state
            hasError && "border-error focus-visible:ring-error",
            className
          )}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={errorMessage ? `${textareaId}-error` : undefined}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            onChange?.(e);
          }}
          value={value}
          defaultValue={defaultValue}
          // Only use HTML maxLength if explicitly provided
          maxLength={maxLength}
          {...props}
        />
        {/* Always show the helper text/counter row */}
        <Text variant="caption" className="mt-1.5 flex justify-between">
          {/* Left side: helper text or error message */}
          {errorMessage ? (
            <span className="text-error" id={`${textareaId}-error`} role="alert">
              {errorMessage}
            </span>
          ) : (
            <span className={isOverLimit ? "text-error" : "text-foreground/70"}>
              {isOverLimit 
                ? `Message exceeds maximum length of ${limit} characters` 
                : helperText || ""}
            </span>
          )}
          
          {/* Right side: always show character counter */}
          {showCharCount && limit && (
            <span className={isOverLimit ? "text-error" : charCount > limit * 0.9 ? "text-warning" : ""}>
              {charCount}/{limit}
            </span>
          )}
        </Text>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };