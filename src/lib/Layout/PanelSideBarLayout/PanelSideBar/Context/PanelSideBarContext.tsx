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
   * The local panel items.
   */
  localItems?: PanelItem[];
  /**
   * The component used to render the menu item links.
   */
  setActivePanel: (panelId: string) => void;
  LinkRenderer: ComponentType<PanelLinkRendererProps<TMenuItem>>;
  toggledMenuItemIds: string[];
  toggleMenuItem: MenuItemToggleFn<TMenuItem>;
  /**
   * The footer content.
   */
  footer?: ReactNode;
  /**
   * The brand content shown on the top navigation bar.
   */
  brand?: ReactNode;
  /**
   * The user dropdown toggle content.
   */
  userDropDownMenuToggle?: ReactNode;
  /**
   * The user dropdown menu content.
   */
  userDropDownMenu?: ReactNode;
  /**
   * The other menu content.
   */
  topBarCustomItems?: ReactNode[];
}

export const PanelSideBarContext = createContext<PanelSideBarContextProps<any, any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>
  extends Pick<
    PanelSideBarContextProps<TPanelItem, TMenuItem>,
    "globalItems" | "LinkRenderer" | "brand" | "footer" | "userDropDownMenu" | "userDropDownMenuToggle" | "topBarCustomItems" | "localItems"
  > {
  /**
   * The children elements.
   */
  children: React.ReactNode;
}

export const PanelSideBarProvider = <TPanelItem, TMenuItem>(props: PanelSideBarMenuProviderProps<TPanelItem, TMenuItem>) => {
  const {
    children,
    globalItems,
    localItems = [],
    LinkRenderer,
    brand = null,
    footer = null,
    userDropDownMenu,
    userDropDownMenuToggle,
    topBarCustomItems,
  } = props;

  const firstActivePanel = globalItems.find(
    (x) => x.children?.find((y) => (y.children ? y.children.find((s) => s.active) : y.active)) ?? x.id,
  );

  const getActivePanelId = () => localItems?.at(0)?.id ?? firstActivePanel?.id ?? "";

  const [activePanelId, setActivePanelId] = useState(getActivePanelId());

  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<string[]>([
    (firstActivePanel?.children
      ? firstActivePanel.children?.find((x) => x.children?.find((s) => s.active))
      : firstActivePanel?.children?.find((x) => x.active)
    )?.id ?? "",
  ]);

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
        localItems,
        LinkRenderer,
        setActivePanel,
        toggledMenuItemIds,
        toggleMenuItem,
        footer,
        userDropDownMenu,
        userDropDownMenuToggle,
        topBarCustomItems,
        brand,
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
