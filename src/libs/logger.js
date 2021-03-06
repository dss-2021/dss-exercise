/**
 * Methods for capturing application errors.
 */

/**
 * Capture an error in the log.
 */
export function logError(error) {
  // TODO: should be forwarded to server-side logging (AirBrake etc.)
  console.warn(error);
}
