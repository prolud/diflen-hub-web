/**
 * Encodes a unit name for use in URLs
 * @param name The unit name to encode
 * @returns The encoded unit name
 */
export function encodeUnitName(name: string): string {
  return encodeURIComponent(name);
}

/**
 * Encodes a lesson name for use in URLs
 * @param name The lesson name to encode
 * @returns The encoded lesson name
 */
export function encodeLessonName(name: string): string {
  return encodeURIComponent(name);
}
