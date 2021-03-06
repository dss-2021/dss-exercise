export const Inputs = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',

  Select: 'Select',
  Back: 'Back',
};

export const Events = {
  Input: 'controlinput',
};

export const makeInputEvent = input => (
  new CustomEvent(Events.Input, {
    bubbles: true,
    detail: { input },
  })
);
