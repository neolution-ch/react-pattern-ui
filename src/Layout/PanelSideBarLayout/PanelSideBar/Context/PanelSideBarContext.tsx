import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { PanelItem, PanelMenuItem } from "../Definitions/PanelSideBarMenuItem";

export interface PanelLinkRendererProps<T> {
  item: PanelMenuItem<T>;
  children: ReactNode;
}

type MenuItemToggleFn<TPanelItem, TMenuItem> = (panelItem: PanelItem<TPanelItem>, menuItem: PanelMenuItem<TMenuItem>) => void;

export interface PanelSideBarContextProps<TPanelItem, TMenuItem> {
  activePanelId: string;
  globalItems: PanelItem<TPanelItem>[];
  LinkRenderer: ComponentType<PanelLinkRendererProps<TMenuItem>>;
  setActivePanel: (panelId: string) => void;
  toggleMenuItem: MenuItemToggleFn<TPanelItem, TMenuItem>;
  setLocalPanelItems: (panelItems: PanelItem<TPanelItem, TMenuItem>) => void;
}

export const PanelSideBarContext = createContext<PanelSideBarContextProps<any, any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>
  extends Pick<PanelSideBarContextProps<TPanelItem, TMenuItem>, "globalItems" | "LinkRenderer"> {
  children: React.ReactNode;
}

export const PanelSideBarProvider = <TPanelItem, TMenuItem>(props: PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>) => {
  const { children, globalItems, LinkRenderer } = props;

  const [activeId, setActiveId] = useState(globalItems.find((x) => x.id)?.id ?? "");
  const [globalPanelState, setGlobalPanelState] = useState<PanelItem<TPanelItem>[]>(globalItems);
  const [localPanelItems, setLocalPanelItems] = useState<PanelItem<TPanelItem, TMenuItem>[]>([]);

  const setActivePanel = (panelId: string) => setActiveId(panelId);

  const toggleMenuItem: MenuItemToggleFn<TPanelItem, TMenuItem> = (panelItem, menuItem) =>
    setGlobalPanelState((prev) =>
      prev.map((x) => {
        const panel: PanelItem<TPanelItem, TMenuItem> = JSON.parse(JSON.stringify(x));

        if (panel.id === panelItem.id) {
          let panelMenuItem = panel.items?.find((item) => item.id === menuItem.id);

          if (panelMenuItem?.id === menuItem.id) {
            panelMenuItem.expanded = !panelMenuItem.expanded;
          }
        }

        return panel;
      }),
    );

  const localPanelItemHandler = (items: PanelItem<TPanelItem, TMenuItem>[]) => {
    if (items?.length > 0) {
      const [firstLocalItem] = items;
      setActivePanel(firstLocalItem.id);
    }
    setLocalPanelItems(items);
  };

  return (
    <PanelSideBarContext.Provider
      value={{
        globalItems: [...globalPanelState, ...(localPanelItems ?? [])],
        LinkRenderer,
        toggleMenuItem: toggleMenuItem,
        setActivePanel: setActivePanel,
        activePanelId: activeId,
        setLocalPanelItems: localPanelItemHandler,
      }}
    >
      {children}
    </PanelSideBarContext.Provider>
  );
};

export const usePanelSideBarContext = () => {
  const context = useContext(PanelSideBarContext);
  if (context === null) {
    throw new Error("usePanelSideBarContext must be used within a PanelSideBarProvider");
  }
  return context;
};
