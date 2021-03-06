import DisHero from '../../components/dis-hero';
import DisScreen from '../../components/dis-screen';
import DisShelf from '../../components/dis-shelf';
import DisTile from '../../components/dis-tile';
import DisWall from '../../components/dis-wall';

import * as api from './api';
import './styles.css';

async function init() {
  const screen = new DisScreen();
  screen.className = 'Home';
  document.body.appendChild(screen);

  const heroArea = document.createElement('div');
  heroArea.className = 'Home__heroArea';

  const shelves = await api.fetchHomeShelves();

  function setHero(itemData) {
    heroArea.innerHTML = '';

    const hero = new DisHero();
    hero.setAttribute('title', itemData.title || '');
    hero.setAttribute('background', itemData.heroBackground || '');
    hero.setAttribute('video', itemData.heroVideo || '');

    heroArea.appendChild(hero);
  }

  const wall = new DisWall();
  wall.className = 'Home__wall';
  wall.addEventListener('focus', (event) => {
    const shelf = event.target.closest('dis-shelf');
    const shelfIndex = [...shelf.children].indexOf(event.target);
    const wallIndex = [...wall.children].indexOf(shelf);
    const itemData = shelves?.[wallIndex]?.items?.[shelfIndex];
    setHero(itemData);
  })

  shelves.forEach((shelfData) => {
    const shelf = new DisShelf();
    shelf.setAttribute('title', shelfData.title);
    shelfData.items.forEach((itemData) => {
      const tile = new DisTile();
      tile.background = itemData.tile;
      shelf.appendChild(tile);
    });
    wall.appendChild(shelf);
  });

  screen.appendChild(heroArea);
  screen.appendChild(wall);
  screen.querySelector('dis-tile').focus();
}

init().catch(e => {
  // TODO: improve this :)
  console.warn('There was an error. :(', e);
});
