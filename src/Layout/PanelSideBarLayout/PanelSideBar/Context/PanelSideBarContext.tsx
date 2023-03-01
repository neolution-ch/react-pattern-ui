import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { PanelItem, PanelMenuItem } from "../Definitions/PanelSideBarMenuItem";

export interface PanelLinkRendererProps<T> {
  item: PanelMenuItem<T>;
  children: ReactNode;
}

type MenuItemToggleFn<TPanelItem, TMenuItem> = (panelItem: PanelItem<TPanelItem>, menuItem: PanelMenuItem<TMenuItem>) => void;

export interface PanelSideBarContextProps<TPanelItem, TMenuItem> {
  activeMenuId: string;
  activePanelId: string;
  /**
   * The global panel items.
   */
  globalItems: PanelItem<TPanelItem, TMenuItem>[];
  /**
   * The component used to render the menu item links.
   */
  LinkRenderer: ComponentType<PanelLinkRendererProps<TMenuItem>>;
  setActivePanel: (panelId: string) => void;
  toggleMenuItem: MenuItemToggleFn<TPanelItem, TMenuItem>;
  setLocalPanelItems: (panelItems: PanelItem<TPanelItem, TMenuItem>) => void;
}

export const PanelSideBarContext = createContext<PanelSideBarContextProps<any, any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>
  extends Pick<PanelSideBarContextProps<TPanelItem, TMenuItem>, "globalItems" | "LinkRenderer"> {
  /**
   * The children elements.
   */
  children: React.ReactNode;
}

export const PanelSideBarProvider = <TPanelItem, TMenuItem>(props: PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>) => {
  const { children, globalItems, LinkRenderer } = props;

  const getFirstPanelId = () => globalItems.find((x) => x.id)?.id ?? "";
  const getFirstMenuItemId = () => {
    const firstPanel = globalItems.find((x) => x.id);
    return firstPanel?.items?.find((x) => x.id)?.id ?? "";
  };

  const [activePanelId, setActivePanelId] = useState(getFirstPanelId());
  const [activeMenuId, setActiveMenuId] = useState(getFirstMenuItemId());
  const [globalPanelState, setGlobalPanelState] = useState<PanelItem<TPanelItem, TMenuItem>[]>(globalItems);
  const [localPanelItems, setLocalPanelItems] = useState<PanelItem<TPanelItem, TMenuItem>[]>([]);

  const setActivePanel = (panelId: string) => setActivePanelId(panelId);

  const toggleMenuItem: MenuItemToggleFn<TPanelItem, TMenuItem> = (panelItem, menuItem) => {
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

    if (!menuItem.children && globalPanelState.map((x) => x.id).includes(panelItem.id)) setActiveMenuId(menuItem.id);
  };

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
        activeMenuId,
        activePanelId,
        globalItems: [...globalPanelState, ...(localPanelItems ?? [])],
        LinkRenderer,
        setActivePanel,
        setLocalPanelItems: localPanelItemHandler,
        toggleMenuItem,
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
