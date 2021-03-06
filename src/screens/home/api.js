/**
 * API methods related to the home screen.
 */

const API_ROOT = 'https://cd-static.bamgrid.com/dp-117731241344';

function getSourceEntity(item) {
  if (item?.programId) return 'program';
  if (item?.seriesId) return 'series';
  if (item?.collectionId) return 'collection';

  // TODO: capture errors like this in a logging system
  console.warn('Unable to determine source entity for', item);
}

function normalizeShelfItem(item) {
  const sourceEntity = getSourceEntity(item);
  if (!sourceEntity) return null;

  return {
    title: item?.text?.title?.full?.[sourceEntity]?.default?.content,

    // TODO: other aspect ratios?
    tile: item?.image?.tile?.['1.78']?.[sourceEntity]?.default?.url,
  };
}

const normalizeShelfSet = (set) => ({
  title: set?.text?.title?.full?.set?.default?.content || '',
  items: (set?.items || []).map(normalizeShelfItem).filter(Boolean),
  refId: set?.refId || null,
  refType: set?.refType || null,
});

// TODO: JSDoc to describe return value?
export async function fetchHomeShelves() {
  const response = await fetch(`${API_ROOT}/home.json`);
  const root = await response.json();
  return (root?.data?.StandardCollection?.containers || [])
    .map(({ set } = {}) => set && normalizeShelfSet(set))
    .filter(Boolean);
}
