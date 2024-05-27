import { PanelItem } from "../Definitions/PanelItem";

/**
 * Recursively gets the hidden panel items identifiers
 * @param items the panel items
 * @returns the hidden panel items identifiers
 */
const getHiddenPanelIds = <TPanelItemId extends string, TPanelItem>(items: PanelItem<TPanelItemId, TPanelItem>[]) => {
  let hiddenIds: TPanelItemId[] = [];

  items.forEach((item) => {
    if (item.display == false) {
      hiddenIds = [...hiddenIds, item.id];
    }
    if (item.children) {
      hiddenIds = [...hiddenIds, ...getHiddenPanelIds(item.children)];
    }
  });

  return hiddenIds;
};

/**
 * Recursively gets the children panel items identifiers
 * @param children the panel items
 * @returns the children panel items identifiers
 */
const getChildrenPanelItemsIds = <TPanelItemId extends string, TPanelItem>(children: PanelItem<TPanelItemId, TPanelItem>[]) => {
  let childrenIds: TPanelItemId[] = [];

  children.forEach((child) => {
    if (child.children) {
      childrenIds = [...childrenIds, child.id];
      childrenIds = [...childrenIds, ...getChildrenPanelItemsIds(child.children)];
    }
  });

  return childrenIds;
};

/**
 * Recursively gets the pre-expanded panel items
 * @param items the panel items
 * @returns the panel items that are pre-expanded
 */
const getPreExpandedMenuItems = <TPanelItemId extends string, TPanelItem>(items: PanelItem<TPanelItemId, TPanelItem>[]) => {
  let preExpandedIds: TPanelItemId[] = [];

  items.forEach((x) => {
    if (x.expanded) {
      preExpandedIds = [...preExpandedIds, x.id];
    }
    if (x.children) {
      preExpandedIds = [...preExpandedIds, ...getPreExpandedMenuItems(x.children)];
    }
  });

  return preExpandedIds;
};

export { getChildrenPanelItemsIds, getHiddenPanelIds, getPreExpandedMenuItems };
