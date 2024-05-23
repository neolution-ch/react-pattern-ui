import { PanelItem } from "../Definitions/PanelItem";

const getActivePanelInternal = <TPanelItemId extends string, TPanelItem>(
  items: PanelItem<TPanelItemId, TPanelItem>[],
): PanelItem<TPanelItemId, TPanelItem> | undefined => items.find((x) => (x.children ? getActivePanelInternal(x.children) : x.active));

export const getActivePanel = <TPanelItemId extends string, TPanelItem>(
  items: PanelItem<TPanelItemId, TPanelItem>[],
  defaultActivePanelId?: TPanelItemId,
) => getActivePanelInternal(items) ?? items.find((x) => (defaultActivePanelId ? x.id === defaultActivePanelId : x.id));

export const hasActiveChildren = <TPanelItemId extends string, TPanelItem>(items: PanelItem<TPanelItemId, TPanelItem>[]) =>
  !!getActivePanelInternal(items);

export const getActivePanelParentsIds = <TPanelItemId extends string, TPanelItem>(items: PanelItem<TPanelItemId, TPanelItem>[], activePanel: TPanelItemId) => {
  let parentsIds: TPanelItemId[] = [];
  
  items.forEach((item) => {
    // we need to check only menu items that have active child
    if (item.children) {
      if (hasActiveChildren(item.children)) {
        parentsIds = [...parentsIds, item.id];
        parentsIds = [...parentsIds, ...getActivePanelParentsIds(item.children, activePanel)];
      }
    }
  });

  return parentsIds;
}