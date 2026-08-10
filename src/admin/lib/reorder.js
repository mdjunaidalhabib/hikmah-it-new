// Shared helper for admin managers that let items be reordered via a
// "position" dropdown instead of a manual sortOrder number field.

// Returns ids in their new order after moving `id` to `newIndex`.
export function reorderIds(orderedIds, id, newIndex) {
  const ids = orderedIds.filter((x) => x !== id);
  ids.splice(newIndex, 0, id);
  return ids;
}

// Given the current (sortOrder-sorted) items and a moved item's new 1-based
// position, returns the list of { id, sortOrder } pairs that actually need
// saving (i.e. whose sortOrder changed), including the moved item itself.
export function computeReorderChanges(items, movedId, newPosition) {
  const orderedIds = items.map((i) => i._id);
  const newOrder = reorderIds(orderedIds, movedId, newPosition - 1);
  const byId = new Map(items.map((i) => [i._id, i]));
  return newOrder
    .map((id, index) => ({ id, sortOrder: index }))
    .filter(({ id, sortOrder }) => byId.get(id)?.sortOrder !== sortOrder);
}
