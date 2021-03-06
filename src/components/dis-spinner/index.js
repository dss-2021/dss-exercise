import template from './template';

/**
 * "Loading" spinner
 */
export default class DisSpinner extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.innerHTML = template;
  }

  hide() {
    this.style.opacity = 0;
  }

  show() {
    this.style.opacity = 1;
  }
}

customElements.define('dis-spinner', DisSpinner);
