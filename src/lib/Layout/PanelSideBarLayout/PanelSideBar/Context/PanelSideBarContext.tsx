import React, { Context, createContext, useContext, useEffect, useMemo, useState } from "react";
import { getActivePanel, getActivePanelParentsIds } from "../Utils/getActivePanel";
import { PanelSideBarContextProps } from "./PanelSideBarContextProps";
import { getHiddenPanelIds, getPreExpandedMenuItems } from "../Utils/panelUtils";

export type MenuItemToggleFn<TPanelItemId extends string> = (menuItemId: TPanelItemId) => void;

const PanelSideBarContext = createContext<PanelSideBarContextProps<any, any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItemId extends string, TPanelItem>
  extends Pick<
    PanelSideBarContextProps<TPanelItemId, TPanelItem>,
    "menuItems" | "LinkRenderer" | "theme" | "renderTilesAsLinks" | "renderFirstItemsLevelAsTiles" | "defaultActivePanelId"
  > {
  /**
   * The children elements.
   */
  children: React.ReactNode;

  /**
   * if the sidebar should be open by default.
   */
  sidebarOpenByDefault?: boolean;
}

export const PanelSideBarProvider = <TPanelItemId extends string, TPanelItem>(
  props: PanelSideBarMenuProviderProps<TPanelItemId, TPanelItem>,
) => {
  const {
    children,
    defaultActivePanelId,
    sidebarOpenByDefault = true,
    menuItems: defaultMenuItems,
    LinkRenderer,
    renderTilesAsLinks = false,
    renderFirstItemsLevelAsTiles = true,
    theme = "blue",
  } = props;
  const menuItems = useMemo(() => defaultMenuItems, [defaultMenuItems]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpenByDefault);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [activePanelId, setActivePanelId] = useState(getActivePanel(menuItems, defaultActivePanelId)?.id);
  const setActivePanel = (panelId: TPanelItemId) => setActivePanelId(panelId);

  const [hiddenMenuItemIds, setHiddenMenuItemsIds] = useState<TPanelItemId[]>(getHiddenPanelIds(menuItems));

  const preExpandedMenuItemIds = getPreExpandedMenuItems(menuItems);
  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<TPanelItemId[]>(
    activePanelId ? preExpandedMenuItemIds.concat(activePanelId) : preExpandedMenuItemIds,
  );
  const toggleMenuItem: MenuItemToggleFn<TPanelItemId> = (menuItemId) => {
    setToggledMenuItemIds((prev) => {
      const idExists = !!prev.find((id) => id == menuItemId);

      if (idExists) {
        return prev.filter((id) => id !== menuItemId);
      }

      return [...prev, menuItemId];
    });
  };

  useEffect(() => {
    const activePanelId = getActivePanel(menuItems, defaultActivePanelId)?.id;
    setActivePanelId(activePanelId);
    if (activePanelId) {
      setToggledMenuItemIds((prev) => {
        const toggledMenuItemIds = [...getActivePanelParentsIds(menuItems, activePanelId), activePanelId].filter((x) => !prev.includes(x));
        return [...prev, ...toggledMenuItemIds];
      });
    }
  }, [menuItems]);

  const untoggleMenuItems = () => setToggledMenuItemIds([]);

  const openMenuItems = (panelItemIds: TPanelItemId[]) => {
    setToggledMenuItemIds((prev) => [...prev, ...panelItemIds.filter((x) => !prev.includes(x))]);
  };

  const closeMenuItems = (panelItemIds: TPanelItemId[], includeActivePanel?: boolean) => {
    const activePanels = activePanelId ? [...getActivePanelParentsIds(menuItems, activePanelId), activePanelId] : [];
    setToggledMenuItemIds((prev) =>
      includeActivePanel
        ? prev.filter((x) => !panelItemIds.includes(x))
        : prev.filter((x) => !panelItemIds.filter((y) => !activePanels.includes(y)).includes(x)),
    );
  };

  return (
    <PanelSideBarContext.Provider
      value={{
        menuItems,
        activePanelId,
        setActivePanel,
        toggledMenuItemIds,
        toggleMenuItem,
        untoggleMenuItems,
        isSidebarOpen,
        toggleSidebar,
        LinkRenderer,
        theme,
        renderFirstItemsLevelAsTiles,
        renderTilesAsLinks,
        openMenuItems,
        closeMenuItems,
        hiddenMenuItemIds,
        setHiddenMenuItemsIds,
      }}
    >
      {children}
    </PanelSideBarContext.Provider>
  );
};

export const usePanelSideBarContext = <TPanelItemId extends string, TPanelItem>() => {
  const context = useContext(PanelSideBarContext as Context<PanelSideBarContextProps<TPanelItemId, TPanelItem>>);
  if (context === null) {
    throw new Error("usePanelSideBarContext must be used within a PanelSideBarProvider");
  }
  return context;
};
