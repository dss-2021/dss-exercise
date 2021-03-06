import template from './template';
import './styles.css';

/**
 * "Hero" elements have a big title and bold background art.
 */
export default class DisHero extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = template;
  }

  connectedCallback() {
    this.shadow.querySelector('[part=title]').innerText = this.getAttribute('title') || '';

    // Hero art (video or background image)
    const videoUrl = this.getAttribute('video');
    const bgUrl = this.getAttribute('background');
    if (videoUrl) this.shadow.querySelector('video').src = videoUrl;
    else if (bgUrl) this.shadow.querySelector('[part=background]').src = bgUrl;
  }
}

customElements.define('dis-hero', DisHero);
