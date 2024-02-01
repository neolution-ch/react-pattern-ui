import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { PanelItem } from "../Definitions/PanelItem";

export interface PanelLinkRendererProps<T> {
  /**
   * The generic panel item.
   */
  item: PanelItem<T>;
  /**
   * The panel children item.
   */
  children: ReactNode;
}

export type MenuItemToggleFn<TPanelItem> = (menuItem: PanelItem<TPanelItem>) => void;

export interface PanelSideBarContextProps<TPanelItem> {
  activePanelId: string;
  /**
   * The global panel items.
   */
  globalItems: PanelItem<TPanelItem>[];
  /**
   * The local panel items.
   */
  localItems?: PanelItem[];
  /**
   * The function used to set a panel as active
   * @param panelId The panel item identifier
   */
  setActivePanel: (panelId: string) => void;
  /**
   * The component used to render the menu item links.
   */
  LinkRenderer: ComponentType<PanelLinkRendererProps<TPanelItem>>;
  /**
   * The list of toggled menu item identifier
   */
  toggledMenuItemIds: string[];
  /**
   * The function used to toggle a menu item
   */
  toggleMenuItem: MenuItemToggleFn<TPanelItem>;
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
   * The menu content on the right.
   */
  topBarRightCustomItems?: ReactNode[];
  /**
   * The menu content on the left.
   */
  topBarLeftCustomItems?: ReactNode[];
  /**
   * The context theme
   */
  theme?: "light";
}

export const PanelSideBarContext = createContext<PanelSideBarContextProps<any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItem>
  extends Pick<
    PanelSideBarContextProps<TPanelItem>,
    | "globalItems"
    | "LinkRenderer"
    | "brand"
    | "footer"
    | "userDropDownMenu"
    | "userDropDownMenuToggle"
    | "topBarRightCustomItems"
    | "topBarLeftCustomItems"
    | "localItems"
    | "theme"
  > {
  /**
   * The children elements.
   */
  children: React.ReactNode;
}

export const PanelSideBarProvider = <TPanelItem,>(props: PanelSideBarMenuProviderProps<TPanelItem>) => {
  const {
    children,
    globalItems,
    localItems = [],
    LinkRenderer,
    brand = null,
    footer = null,
    userDropDownMenu,
    userDropDownMenuToggle,
    topBarRightCustomItems,
    topBarLeftCustomItems,
    theme = "light",
  } = props;

  const activePanel = globalItems.find((x) =>
    x.children ? x.children.find((y) => (y.children ? y.children.find((s) => s.active) : y.active)) : x.active,
  );
  const firstActivePanel = activePanel ?? globalItems.find((x) => x.id);

  const getActivePanelId = () => localItems?.at(0)?.id ?? firstActivePanel?.id ?? "";

  const [activePanelId, setActivePanelId] = useState(getActivePanelId());

  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<string[]>([
    (firstActivePanel?.children
      ? firstActivePanel.children?.find((x) => x.children?.find((s) => s.active))
      : firstActivePanel?.children?.find((x) => x.active)
    )?.id ?? "",
  ]);

  const setActivePanel = (panelId: string) => setActivePanelId(panelId);

  const toggleMenuItem: MenuItemToggleFn<TPanelItem> = (menuItem) => {
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
        topBarRightCustomItems,
        topBarLeftCustomItems,
        brand,
        theme,
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
