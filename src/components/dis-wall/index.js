import { Events, Inputs } from  '../../libs/control';
import template from './template';
import './styles.css';

/**
 * Collection of vertically-stacked DisShelf components.
 */
export default class DisWall extends HTMLElement {
  constructor() {
    super();

    this.onInput = this.onInput.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = template;

    this.trackEl = shadow.querySelector('[part=track]');
  }

  connectedCallback() {
    this.addEventListener(Events.Input, this.onInput);
  }

  disconnectedCallback() {
    this.removeEventListener(Events.Input, this.onInput);
  }

  scrollToElement(child) {
    const pixels = child.getBoundingClientRect().top - this.trackEl.getBoundingClientRect().top;
    this.trackEl.style.transform = `translateY(-${pixels}px)`;
  }

  onInput(event) {
    // TODO: DRY the Inputs.Up/Inputs.Down handlers
    switch (event.detail.input) {
      case Inputs.Up: {
        const shelf = event.target.closest('dis-shelf');
        const children  = [...this.children];
        const shelfIndex = children.indexOf(shelf);
        const prev = children
          .filter((el, i) => (
            i < shelfIndex && el.childElementCount > 0
          ))
          .pop();
        if (prev) {
          this.scrollToElement(prev);
          prev.windowIndex = shelf.windowIndex;
        }
        break;
      }

      case Inputs.Down: {
        const shelf = event.target.closest('dis-shelf');
        const children  = [...this.children];
        const shelfIndex = children.indexOf(shelf);
        const next = children.find((el, i) => (
          i > shelfIndex && el.childElementCount > 0
        ));
        if (next) {
          this.scrollToElement(next);
          next.windowIndex = shelf.windowIndex;
        }
        break;
      }
    }
  }
}

customElements.define('dis-wall', DisWall);
