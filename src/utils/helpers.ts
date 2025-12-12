/**
 * Generate a random alphanumeric ID
 * @returns A 9-character random string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Generate a random rotation for sticky notes
 * @returns A number between -3 and 3 degrees
 */
export const getRandomRotation = (): number => {
  return Math.floor(Math.random() * 7) - 3;
};

/**
 * Deep clone an object
 * @param obj Object to clone
 * @returns A deep copy of the object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
