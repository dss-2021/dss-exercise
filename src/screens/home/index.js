import DisScreen from '../../components/dis-screen';
import DisShelf from '../../components/dis-shelf';
import DisTile from '../../components/dis-tile';
import DisWall from '../../components/dis-wall';
import * as api from './api';

async function init() {
  const screen = new DisScreen();
  document.body.appendChild(screen);

  const shelves = await api.fetchHomeShelves();
  const wall = new DisWall();

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

  screen.appendChild(wall);
  screen.querySelector('dis-tile').focus();
}

init().catch(e => {
  // TODO: improve this :)
  console.warn('There was an error. :(', e);
});
