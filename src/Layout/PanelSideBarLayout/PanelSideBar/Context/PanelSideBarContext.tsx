import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { PanelItem, PanelMenuItem } from "../Definitions/PanelSideBarMenuItem";

export interface PanelLinkRendererProps<T> {
  item: PanelMenuItem<T>;
  children: ReactNode;
}

export type MenuItemToggleFn<TMenuItem> = (menuItem: PanelMenuItem<TMenuItem>) => void;

export interface PanelSideBarContextProps<TPanelItem, TMenuItem> {
  /**
   * The global panel items.
   */
  globalItems: PanelItem<TPanelItem, TMenuItem>[];
  /**
   * The component used to render the menu item links.
   */
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

    console.log("I can push");
  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<string[]>([]);

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
        globalItems,
        LinkRenderer,
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
