import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Converts an object of query parameters into a URL query string.
 *
 * @param query - An object containing query parameters as key-value pairs.
 * @returns A URL query string.
 *
 * @example
 * ```typescript
 * parseQuery({ foo: "bar", baz: 42 }); // "?foo=bar&baz=42"
 * parseQuery({}); // ""
 * ```
 */

export const parseQuery = (query: Record<string, string | number>): string => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });
  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};