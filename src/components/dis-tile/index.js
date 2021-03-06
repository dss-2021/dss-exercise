import DisFocusable from '../dis-focusable';
import template from './template';

/**
 * Tile with background art that expands when focused.
 */
export default class DisTile extends DisFocusable {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.innerHTML = template;
  }

  connectedCallback() {
    const bg = this.getAttribute('background');
    if (bg) this.shadow.querySelector('::part(background)').src = bg;
  }
}

customElements.define('dis-tile', DisTile);
