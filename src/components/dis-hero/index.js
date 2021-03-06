import template from './template';

/**
 * "Hero" component
 */
export default class DisHero extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.innerHTML = template;
  }

  connectedCallback() {
    this.shadow.querySelector('::part(title)').innerText = this.getAttribute('title') || '';

    // Hero art (video or background image)
    const videoUrl = this.getAttribute('video');
    const bgUrl = this.getAttribute('background');
    if (videoUrl) this.shadow.querySelector('video').src = videoUrl;
    else if (bgUrl) this.shadow.querySelector('::part(background)').src = bgUrl;
  }
}

customElements.define('dis-hero', DisHero);
