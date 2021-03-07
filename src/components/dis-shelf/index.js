import * as control from  '../../libs/control';
import * as focus from  '../../libs/focus';
import template from './template';
import './styles.css';

/**
 * Horizontal shelf of focusable items.
 */
export default class DisShelf extends HTMLElement {
  constructor() {
    super();

    // The shelf has a "window" of visible & focusable items
    // Note: these properties have public setters and getters
    this._windowOffset = 0;
    this._windowItems = 5;

    this.onFocus = this.onFocus.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onSlotChange = this.onSlotChange.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = template;

    this.titleEl = shadow.querySelector('[part=title]');
    this.trackEl = shadow.querySelector('[part=track]');
    this.slotEl = shadow.querySelector('slot');
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      this.titleEl.innerText = newValue;
    }
  }

  connectedCallback() {
    this.titleEl.innerText = this.getAttribute('title') || '';

    this.addEventListener(control.Events.Input, this.onInput);
    this.addEventListener(focus.Events.Focus, this.onFocus);
    this.slotEl.addEventListener('slotchange', this.onSlotChange);
  }

  disconnectedCallback() {
    this.removeEventListener(focus.Events.Focus, this.onFocus);
    this.removeEventListener(control.Events.Input, this.onInput);
    this.slotEl.removeEventListener('slotchange', this.onSlotChange);
  }

  onFocus(event) {
    this.focusIndex = [...this.children].indexOf(event.target);

    if (this.focusIndex > this.windowOffset + this.windowItems - 1) {
      this.windowOffset = this.focusIndex - this.windowItems + 1;
    } else if (this.focusIndex < this.windowOffset) {
      this.windowOffset = this.focusIndex;
    }
  }

  onInput(event) {
    switch (event.detail.input) {
      case control.Inputs.Left: {
        const next = this.children[this.focusIndex - 1];
        if (next) next.focus();
        break;
      }

      case control.Inputs.Right: {
        const next = this.children[this.focusIndex + 1];
        if (next) next.focus();
        break;
      }
    }
  }

  onSlotChange() {
    this.style.setProperty('--total-items', this.children.length);
  }

  get windowIndex() {
    return this.focusIndex - this.windowOffset;
  }

  set windowIndex(value) {
    this.children[this.windowOffset + value].focus();
  }

  get windowItems() {
    return this._windowItems;
  }

  set windowItems(value) {
    this._windowItems = value;
    this.style.setProperty('--window-items', this._windowItems);
  }

  get windowOffset() {
    return this._windowOffset;
  }

  set windowOffset(value) {
    this._windowOffset = value;
    this.style.setProperty('--window-offset', this._windowOffset);
  }
}

customElements.define('dis-shelf', DisShelf);
