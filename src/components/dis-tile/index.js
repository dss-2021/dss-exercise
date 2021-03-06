import DisFocusable from '../dis-focusable';
import './index.css';

export default class DisTile extends DisFocusable {
  connectedCallback() {
  }

  disconnectedCallback() {
  }
}

customElements.define('dis-tile', DisTile);
