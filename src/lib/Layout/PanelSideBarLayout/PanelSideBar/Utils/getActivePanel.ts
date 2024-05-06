import { PanelItem } from "../Definitions/PanelItem";

export const getActivePanel = <TPanelItemId extends string, TPanelItem>(items: PanelItem<TPanelItemId, TPanelItem>[], defaultActivePanelId?: TPanelItemId) => {
  const activePanel = items.find((x) =>
    x.children ? x.children.find((y) => (y.children ? y.children.find((s) => s.active) : y.active)) : x.active,
  );

  return activePanel ?? items.find((x) => (defaultActivePanelId ? x.id === defaultActivePanelId : x.id));
};
