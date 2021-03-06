/**
 * This module contains methods used to traverse the Home Screen API.
 * Although it's tempting to try modeling this API based on shape,
 * there's no known contract/documentation to support that, so it's
 * safest to interact with it transactionally and .
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
      item?.image?.background?.['1.78']?.[sourceEntity]?.default?.url
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
  refType: set?.refType || null,
});

/**
 * Fetches API data for the home screen and resolves with an
 * array of normalized shelf items.
 */
// TODO: JSDoc to describe return value?
export async function fetchHomeShelves() {
  const response = await fetch(`${API_ROOT}/home.json`);
  const root = await response.json();
  return (root?.data?.StandardCollection?.containers || [])
    .map(({ set } = {}) => set && normalizeShelfSet(set))
    .filter(Boolean);
}
