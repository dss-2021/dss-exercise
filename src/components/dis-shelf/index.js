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

    this.cursor = 0;
    this.itemsShown = 5;

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
    switch (name) {
      case 'title':
        this.titleEl.innerText = newValue;
        break;

      default:
        // Unrecognized attribute
        break;
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

    if (this.focusIndex > this.cursor + this.itemsShown - 1) {
      this.cursor = this.focusIndex - this.itemsShown + 1;
    } else if (this.focusIndex < this.cursor) {
      this.cursor = this.focusIndex;
    }

    this.style.setProperty('--cursor', this.cursor);
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
    this.style.setProperty('--item-count', this.children.length);
  }

  get visibleFocusIndex() {
    return this.focusIndex - this.cursor;
  }

  set visibleFocusIndex(value) {
    this.children[this.cursor + value].focus();
  }
}

customElements.define('dis-shelf', DisShelf);
