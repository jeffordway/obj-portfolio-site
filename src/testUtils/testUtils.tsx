// Shared test utilities and mocks for all tests
import React from "react";
import type { ReactNode } from "react";

/**
 * Wrapper for React hooks that need children/context
 */
export interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => <>{children}</>;

/**
 * Utility to mock and restore global objects (e.g., window, document)
 */
export function withMockedGlobal<T extends keyof typeof globalThis>(
  key: T,
  mockValue: typeof globalThis[T]
) {
  const original = globalThis[key];
  beforeAll(() => {
    (globalThis[key] as typeof globalThis[T]) = mockValue;
  });
  afterAll(() => {
    (globalThis[key] as typeof globalThis[T]) = original;
  });
}

/**
 * Utility to mock and restore console methods
 */
export function mockConsole<K extends keyof Console>(method: K) {
  let original: Console[K];
  beforeEach(() => {
    original = console[method];
    console[method] = jest.fn() as any;
  });
  afterEach(() => {
    console[method] = original;
  });
}

/**
 * Utility to reset all mocks before each test
 */
beforeEach(() => {
  jest.clearAllMocks();
});
