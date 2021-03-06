import DisHero from '../../components/dis-hero';
import DisScreen from '../../components/dis-screen';
import DisShelf from '../../components/dis-shelf';
import DisTile from '../../components/dis-tile';
import { Events as FocusEvents } from '../../libs/focus';
import { logError } from '../../libs/logger';
import * as api from './api';
import template from './template';

export default class DisHomeScreen extends DisScreen {
  constructor() {
    super();

    this.onWallFocus = this.onWallFocus.bind(this);
  }

  /**
   * Asynchronous method to populate the home screen (from DisShelf).
   */
  async loadScreen() {
    this.shelves = await api.fetchHomeShelves();

    this.innerHTML += template;
    this.heroArea = this.querySelector('div[data-hero-area]');
    this.wall = this.querySelector('dis-wall');
    this.wall.addEventListener(FocusEvents.Focus, this.onWallFocus);

    // Populate initial shelves based on API data
    this.shelves.forEach((shelfData) => {
      const shelf = new DisShelf();
      shelf.setAttribute('title', shelfData.title);
      this.addShelfItems(shelf, shelfData.items);
      this.wall.appendChild(shelf);
    });

    // Automatically set focus on the first tile
    this.wall.querySelector('dis-tile').focus();
  }

  /**
   * Asynchronous method to tear down the home screen (from DisShelf).
   */
  async unloadScreen() {
    this.wall.removeEventListener(FocusEvents.Focus, this.onWallFocus);
  }

  /**
   * Check for unloaded shelves "near" the given wall index,
   * load their data, and populate the shelf element.
   */
  async loadShelvesNear(index) {
    const shelfOffset = 3;

    // Find the shelves nearby that have not been loaded
    const nextShelves = this.shelves
      .map((shelf = {}, index) => ({ ...shelf, index }))
      .slice(index, index + shelfOffset)
      .filter(shelf => (
        Boolean(shelf.refId)
        && !shelf.loading
        && shelf.items.length === 0
      ));

    // Load each of the next shelves
    for (let shelf of nextShelves) {
      this.shelves[shelf.index].loading = true;

      // Obtain data for this shelf from the API
      const shelfData = await api.fetchShelf(shelf.refId);
      this.shelves[shelf.index] = shelfData;

      // Populate the shelf component with new tiles
      const shelfEl = this.wall.children[shelf.index];
      this.addShelfItems(shelfEl, shelfData?.items);
    }
  }

  /**
   * Add new tiles to the given shelf element based on item data.
   */
  addShelfItems(shelfEl, items = []) {
    for (let item of items) {
      const tile = new DisTile();
      tile.setAttribute('background', item.tile || '');
      tile.setAttribute('title', item.title || '');
      shelfEl.appendChild(tile);
    }
  }

  /**
   * Re-sets the hero area with a new hero based on the given details.
   */
  setHero(itemData) {
    this.heroArea.innerHTML = '';

    const hero = new DisHero();
    hero.setAttribute('title', itemData.title || '');
    hero.setAttribute('background', itemData.heroBackground || '');
    hero.setAttribute('video', itemData.heroVideo || '');

    this.heroArea.appendChild(hero);
  }

  /**
   * Fires whenever focus changes within the wall.
   */
  onWallFocus(event) {
    const shelf = event.target.closest('dis-shelf');
    const shelfIndex = [...shelf.children].indexOf(event.target);
    const wallIndex = [...this.wall.children].indexOf(shelf);

    // Load "ref" shelves that may soon enter the viewport
    this.loadShelvesNear(wallIndex).catch(logError);

    // Update the "hero" to reflect details of the focused item
    const itemData = this.shelves?.[wallIndex]?.items?.[shelfIndex];
    this.setHero(itemData);
  }
}

customElements.define('dis-home-screen', DisHomeScreen);
