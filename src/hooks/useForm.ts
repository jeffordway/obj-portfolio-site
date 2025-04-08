"use client";

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { z } from 'zod';

/**
 * Form status states
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Generic type for form errors
 */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Configuration options for the useForm hook
 */
export interface UseFormConfig<T extends Record<string, any>> {
  /**
   * Initial form data
   */
  initialValues: T;
  
  /**
   * Zod schema for validation
   */
  validationSchema?: z.ZodType<T>;
  
  /**
   * Function to handle form submission
   */
  onSubmit: (values: T) => Promise<void> | void;
}

/**
 * Custom hook for form handling with validation
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormConfig<T>) {
  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  /**
   * Reset the form to its initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
    setTouched({});
  }, [initialValues]);

  /**
   * Handle field change events
   */
  const handleChange = useCallback(
    (field: keyof T) => 
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      // Type guard for checkbox inputs
      const isCheckbox = (target: EventTarget): target is HTMLInputElement => {
        return target instanceof HTMLInputElement && target.type === 'checkbox';
      };
      
      // Determine the value based on input type
      const fieldValue = isCheckbox(e.target) 
        ? e.target.checked 
        : e.target.value;
      
      setValues((prev) => ({ ...prev, [field]: fieldValue }));
      
      // Clear error for this field on change
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
      
      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
    },
    [errors]
  );

  /**
   * Set a specific field value programmatically
   */
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
    
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, [errors]);

  /**
   * Validate the form using the provided schema
   */
  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;
    
    const result = validationSchema.safeParse(values);
    
    if (!result.success) {
      const fieldErrors: FormErrors<T> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof T] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    
    setErrors({});
    return true;
  }, [validationSchema, values]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});
      setStatus('submitting');
      
      // Mark all fields as touched on submit
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      );
      setTouched(allTouched);
      
      // Validate form
      const isValid = validateForm();
      
      if (!isValid) {
        setStatus('idle');
        
        // Focus the first field with an error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector<HTMLElement>(
            `[name="${firstErrorField}"]`
          );
          element?.focus();
        }
        return;
      }
      
      try {
        await onSubmit(values);
        setStatus('success');
      } catch (error) {
        console.error('Form submission error:', error);
        setStatus('error');
      }
    },
    [onSubmit, validateForm, values, errors]
  );

  return {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    setStatus,
  };
}
