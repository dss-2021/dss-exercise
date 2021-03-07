import DisFocusable from '../dis-focusable';
import template from './template';
import './styles.css';

/**
 * Tile with background art that expands when focused.
 */
export default class DisTile extends DisFocusable {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = template;

    this.backgroundEl = this.shadow.querySelector('[part=background]');

    this.onBackgroundError = this.onBackgroundError.bind(this);
  }

  connectedCallback() {
    this.backgroundEl.addEventListener('error', this.onBackgroundError);

    const bg = this.getAttribute('background');
    if (bg) this.backgroundEl.src = bg;
  }

  disconnectedCallback() {
    this.backgroundEl.removeEventListener('error', this.onBackgroundError);
  }

  onBackgroundError() {
    this.backgroundEl.style.display = 'none';

    const title = this.getAttribute('title');
    this.shadow.querySelector('[part=content]').innerText = title;
  }
}

customElements.define('dis-tile', DisTile);
