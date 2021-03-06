import { logError } from  '../../libs/logger';
import DisSpinner from '../dis-spinner';
import './styles.css';

/**
 * An application screen (e.g. home screen, collection screen, etc.)
 * Handles things like loading spinners & error messages.
 */
export default class DisScreen extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'closed' });

    this.slotEl = document.createElement('slot');
    shadow.appendChild(this.slotEl);

    this.spinnerEl = new DisSpinner();
    shadow.appendChild(this.spinnerEl);

    this.onSlotChange = this.onSlotChange.bind(this);
  }

  connectedCallback() {
    this.slotEl.addEventListener('slotchange', this.onSlotChange);
    this.loadScreen().catch(logError);
  }

  disconnectedCallback() {
    this.slotEl.removeEventListener('slotchange', this.onSlotChange);
    this.unloadScreen().catch(logError);
  }

  onSlotChange() {
    // Hide the spinner if there are items on the screen
    if (this.children.length) {
      this.spinnerEl.hide();
    } else {
      this.spinnerEl.show();
    }
  }

  /**
   * Asynchronous method to load and populate screen
   * (to be overridden by implementation prototype)
   */
  async loadScreen() {
    // ...
  }

  /**
   * Asynchronous method to unload a screen
   * (to be overridden by implementation prototype)
   */
  async unloadScreen() {
    // ...
  }
}

customElements.define('dis-screen', DisScreen);
