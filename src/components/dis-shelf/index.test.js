import jest from 'jest-mock';
import DisTile from '../dis-tile';
import DisShelf from './index';

let shelf, tiles;

beforeEach(() => {
  shelf = new DisShelf();
  tiles = [...Array(10)].map(
    () => shelf.appendChild(new DisTile())
  );
  document.body.appendChild(shelf);
})

it('should recognize appended elements as children', () => {
  expect(shelf.children).toHaveLength(10);
});

it('should receive focus event', () => {
  const onFocus = jest.fn();
  shelf.addEventListener('focus', onFocus)
  tiles[0].focus();
  expect(onFocus).toHaveBeenCalled();
});

it('should update the focusIndex according to the focused child', () => {
  tiles[4].focus();
  expect(shelf.focusIndex).toBe(4);
});

it('should maintain offset when focus reaches edge', () => {
  tiles[shelf.itemsShown - 1].focus();
  expect(shelf.cursor).toBe(0);
});

it('should move offset when focus passes edge', () => {
  tiles[shelf.itemsShown].focus();
  expect(shelf.cursor).toBe(1);
});
