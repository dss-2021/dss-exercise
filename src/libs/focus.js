/**
 * Methods and events related to the currently focused element.
 */

import { Inputs, makeInputEvent } from  './control';

/**
 * Enum: focus-related events.
 */
export const Events = {
  Focus: 'focus',
};

// The element that currently has focus
let focus;

// Maps keyboard events to controller inputs for the keyup listener
const EventKeyMap = {
  ArrowUp: Inputs.Up,
  ArrowDown: Inputs.Down,
  ArrowLeft: Inputs.Left,
  ArrowRight: Inputs.Right,

  Enter: Inputs.Select,
  Escape: Inputs.Back,
};

// Listen for keyboard input and translate to an input event
// originating from the currently focused element
// TODO: should this be in the control lib?
document.body.addEventListener('keyup', (event) => {
  const input = EventKeyMap[event.key];
  if (focus && input) {
    focus.dispatchEvent(makeInputEvent(input));
  }
});

/**
 * Returns the element that currently has focus.
 */
export function getFocus() {
  return focus;
}

/**
 * Moves focus to a new element.
 */
export function setFocus(newFocus) {
  focus?.removeAttribute('focus');

  focus = newFocus;
  focus.setAttribute('focus', '');
  focus.dispatchEvent(
    new CustomEvent(Events.Focus, { bubbles: true })
  );
}
