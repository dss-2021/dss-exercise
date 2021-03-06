import { Inputs, makeInputEvent } from  './control';

export const Events = {
  Focus: 'focus',
};

const EventKeyMap = {
  ArrowUp: Inputs.Up,
  ArrowDown: Inputs.Down,
  ArrowLeft: Inputs.Left,
  ArrowRight: Inputs.Right,

  Enter: Inputs.Select,
  Escape: Inputs.Back,
};

let focus;

document.body.addEventListener('keyup', (event) => {
  const input = EventKeyMap[event.key];
  if (focus && input) {
    focus.dispatchEvent(makeInputEvent(input));
  }
});

export function getFocus() {
  return focus;
}

export function setFocus(newFocus) {
  if (focus) {
    focus.removeAttribute('focus');
  }

  focus = newFocus;
  focus.setAttribute('focus', '');
  focus.dispatchEvent(
    new CustomEvent(Events.Focus, { bubbles: true })
  );
}
