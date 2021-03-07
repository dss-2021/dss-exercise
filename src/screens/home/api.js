/**
 * This module contains methods to fetch & parse data from the server.
 * Although it's tempting to try modeling the data API based on shape,
 * there's no known contract/documentation to support that so it's
 * safest to interact with it transactionally and normalize responses.
 */

import { logError } from '../../libs/logger';

const API_ROOT = 'https://cd-static.bamgrid.com/dp-117731241344';

/**
 * Given an item from the API's set, attempts to determine the
 * appropriate "source entity" sometimes used as a property name.
 */
function getSourceEntity(item) {
  if (item?.programId) return 'program';
  if (item?.seriesId) return 'series';
  if (item?.collectionId) return 'collection';

  logError(new Error('Unable to determine source entity for set item'));
}

/**
 * Normalizes one of the items from an API "set" response
 * to a more predictable shape for use on the home screen.
 */
function normalizeShelfItem(item) {
  const sourceEntity = getSourceEntity(item);
  if (!sourceEntity) return null;

  const background = item?.image?.background?.['1.78']?.[sourceEntity]?.default;
  const backgroundWidth = Math.min(background?.masterWidth || 1000, 1920);

  return {
    title: (
      item?.text?.title?.full?.[sourceEntity]?.default?.content
      || null
    ),
    tile: (
      item?.image?.tile?.['1.78']?.[sourceEntity]?.default?.url
      || item?.image?.tile?.['1.78']?.default?.default?.url
      || null
    ),
    heroBackground: (
      background?.url?.replace('width=500', `width=${backgroundWidth}`)
      || null
    ),
    heroVideo: (
      (item?.videoArt || [])
        .find(art => art?.purpose === 'full_bleed')
        ?.mediaMetadata?.urls?.[0]?.url
      || null
    ),
  };
}

/**
 * Normalizes a "set" object from the API.
 */
const normalizeShelfSet = (set) => ({
  title: set?.text?.title?.full?.set?.default?.content || '',
  items: (set?.items || []).map(normalizeShelfItem).filter(Boolean),
  refId: set?.refId || null,
});

/**
 * Fetches "set" API data for the given ref ID and resolves
 * with a normalized shelf.
 */
export async function fetchShelf(refId) {
  const response = await fetch(`${API_ROOT}/sets/${refId}.json`);
  const root = await response.json();
  return normalizeShelfSet(Object.values(root?.data || {})?.[0]);
}

/**
 * Fetches API data for the home screen and resolves with an
 * array of normalized shelves.
 */
// TODO: JSDoc to describe return value?
export async function fetchHomeShelves() {
  const response = await fetch(`${API_ROOT}/home.json`);
  const root = await response.json();
  return (root?.data?.StandardCollection?.containers || [])
    .map(({ set } = {}) => set && normalizeShelfSet(set))
    .filter(Boolean);
}
