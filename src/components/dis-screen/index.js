import DisSpinner from '../dis-spinner';
import './styles.css';

/**
 * An application screen (e.g. home screen, collection screen, etc.)
 * Handles things like loading spinners & error messages.
 */
export default class DisScreen extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      delegatesFocus: true,
      mode: 'open',
    });

    this.slotEl = document.createElement('slot');
    shadow.appendChild(this.slotEl);

    this.spinnerEl = new DisSpinner();
    shadow.appendChild(this.spinnerEl);

    this.onSlotChange = this.onSlotChange.bind(this);
  }

  connectedCallback() {
    this.slotEl.addEventListener('slotchange', this.onSlotChange);
  }

  disconnectedCallback() {
    this.slotEl.removeEventListener('slotchange', this.onSlotChange);
  }

  onSlotChange() {
    // Hide the spinner if there are items on the screen
    if (this.children.length) {
      this.spinnerEl.hide();
    } else {
      this.spinnerEl.show();
    }
  }
}

customElements.define('dis-screen', DisScreen);
