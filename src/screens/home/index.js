import DisHero from '../../components/dis-hero';
import DisScreen from '../../components/dis-screen';
import DisShelf from '../../components/dis-shelf';
import DisTile from '../../components/dis-tile';
import { Events as FocusEvents } from '../../libs/focus';
import * as api from './api';
import template from './template';

export default class DisHomeScreen extends DisScreen {
  constructor() {
    super();

    this.onWallFocus = this.onWallFocus.bind(this);
  }

  async loadScreen() {
    this.shelves = await api.fetchHomeShelves();

    this.innerHTML += template;
    this.heroArea = this.querySelector('div[data-hero-area]');

    this.wall = this.querySelector('dis-wall');
    this.wall.addEventListener(FocusEvents.Focus, this.onWallFocus);

    // Populate shelves based on API data
    this.shelves.forEach((shelfData) => {
      const shelf = new DisShelf();
      shelf.setAttribute('title', shelfData.title);
      shelfData.items.forEach((itemData) => {
        const tile = new DisTile();
        tile.setAttribute('background', itemData.tile || '');
        shelf.appendChild(tile);
      });
      this.wall.appendChild(shelf);
    });

    this.wall.querySelector('dis-tile').focus();
  }

  async unloadScreen() {
    this.wall.removeEventListener(FocusEvents.Focus, this.onWallFocus);
  }

  setHero(itemData) {
    this.heroArea.innerHTML = '';

    const hero = new DisHero();
    hero.setAttribute('title', itemData.title || '');
    hero.setAttribute('background', itemData.heroBackground || '');
    hero.setAttribute('video', itemData.heroVideo || '');

    this.heroArea.appendChild(hero);
  }

  onWallFocus(event) {
    const shelf = event.target.closest('dis-shelf');
    const shelfIndex = [...shelf.children].indexOf(event.target);
    const wallIndex = [...this.wall.children].indexOf(shelf);
    const itemData = this.shelves?.[wallIndex]?.items?.[shelfIndex];
    this.setHero(itemData);
  }
}

customElements.define('dis-home-screen', DisHomeScreen);
