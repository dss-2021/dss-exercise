/**
 * Methods and constants related to "controller" input
 * e.g. from a TV remote.
 */

/**
 * Enum: inputs, e.g. buttons on the remote.
 */
export const Inputs = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',

  Select: 'Select',
  Back: 'Back',
};

/**
 * Enum: controller related events.
 */
export const Events = {
  Input: 'controlinput',
};

/**
 * Creates and returns an event representing a controller action.
 */
export const makeInputEvent = input => (
  new CustomEvent(Events.Input, {
    bubbles: true,
    detail: { input },
  })
);
