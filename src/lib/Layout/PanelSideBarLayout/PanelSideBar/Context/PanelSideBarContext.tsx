import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { PanelItem } from "../Definitions/PanelSideBarMenuItem";

export interface PanelLinkRendererProps<T> {
  item: PanelItem<T>;
  children: ReactNode;
}

export type MenuItemToggleFn<TMenuItem> = (menuItem: PanelItem<TMenuItem>) => void;

export interface PanelSideBarContextProps<TPanelItem, TMenuItem> {
  activePanelId: string;
  /**
   * The global panel items.
   */
  globalItems: PanelItem<TPanelItem, TMenuItem>[];
  /**
   * The component used to render the menu item links.
   */
  setActivePanel: (panelId: string) => void;
  LinkRenderer: ComponentType<PanelLinkRendererProps<TMenuItem>>;
  toggledMenuItemIds: string[];
  toggleMenuItem: MenuItemToggleFn<TMenuItem>;
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

  //const firstActivePanel = globalItems.find((x) => x.children?.find((y) => y.active)) ?? globalItems.find((x) => x.id);

  const firstActivePanel = globalItems.find(x => x.children
      ?.find(y => y.children ? y.children.find(s => s.active) : y.active));

  const getActivePanelId = () => firstActivePanel?.id ?? "";

  const [activePanelId, setActivePanelId] = useState(getActivePanelId());

  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<string[]>([(firstActivePanel?.children ?
      firstActivePanel.children?.find((x) => x.children?.find(s => s.active)) : firstActivePanel?.children?.find((x) => x.active))?.id ?? ""]);

  const setActivePanel = (panelId: string) => setActivePanelId(panelId);

  const toggleMenuItem: MenuItemToggleFn<TMenuItem> = (menuItem) => {
    setToggledMenuItemIds((prev) => {
      const idExists = !!prev.find((id) => id == menuItem.id);

      if (idExists) {
        return prev.filter((id) => id !== menuItem.id);
      }

      return [...prev, menuItem.id];
    });
  };

  return (
    <PanelSideBarContext.Provider
      value={{
        activePanelId,
        globalItems,
        LinkRenderer,
        setActivePanel,
        toggledMenuItemIds,
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
