import { Events, Inputs } from  '../../libs/control';
import './styles.css'; // TODO: should be a template

/**
 * Collection of vertically-stacked DisShelf components.
 */
export default class DisWall extends HTMLElement {
  constructor() {
    super();

    this.onInput = this.onInput.bind(this);

    const shadow = this.attachShadow({
      delegatesFocus: true,
      mode: 'open',
    });

    this.trackEl = document.createElement('div');
    this.trackEl.setAttribute('part', 'track');
    shadow.appendChild(this.trackEl);

    this.slotEl = document.createElement('slot');
    this.trackEl.appendChild(this.slotEl);
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
          prev.visibleFocusIndex = shelf.visibleFocusIndex;
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
          next.visibleFocusIndex = shelf.visibleFocusIndex;
        }
        break;
      }
    }
  }
}

customElements.define('dis-wall', DisWall);
