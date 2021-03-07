import { setFocus } from  '../../libs/focus';

/**
 * Base component for elements reachable via our custom focus.
 */
export default class DisFocusable extends HTMLElement {
  focus() {
    setFocus(this);
  }
}

customElements.define('dis-focusable', DisFocusable);
