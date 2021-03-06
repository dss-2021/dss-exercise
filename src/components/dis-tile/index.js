import DisFocusable from '../dis-focusable';
import template from './template';

export default class DisTile extends DisFocusable {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.innerHTML = template;
  }

  connectedCallback() {
    this.shadow.querySelector('::part(background)').src = this.background;
  }

  disconnectedCallback() {
  }
}

customElements.define('dis-tile', DisTile);
