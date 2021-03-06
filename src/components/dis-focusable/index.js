import { setFocus } from  '../../libs/focus';

export default class DisFocusable extends HTMLElement {
  constructor() {
    super();
  }

  focus() {
    setFocus(this);
  }
}

customElements.define('dis-focusable', DisFocusable);
