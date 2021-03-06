import DisFocusable from '../dis-focusable';
import './styles.css'; // TODO: should probably be a template

export default class DisTile extends DisFocusable {
  connectedCallback() {
  }

  disconnectedCallback() {
  }
}

customElements.define('dis-tile', DisTile);
