import React, { Context, createContext, useCallback, useContext, useState } from "react";
import { getActivePanel } from "../Utils/getActivePanel";
import { PanelSideBarContextProps } from "./PanelSideBarContextProps";

export type MenuItemToggleFn<TPanelItemId extends string> = (menuItemId: TPanelItemId) => void;

const PanelSideBarContext = createContext<PanelSideBarContextProps<any, any> | null>(null);

export interface PanelSideBarMenuProviderProps<TPanelItemId extends string, TPanelItem>
  extends Pick<PanelSideBarContextProps<TPanelItemId, TPanelItem>, "menuItems" | "defaultActivePanelId"> {
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
  const { children, defaultActivePanelId, sidebarOpenByDefault = true, menuItems: defaultMenuItems } = props;
  console.log(defaultMenuItems);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  console.log(menuItems);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpenByDefault);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [activePanelId, setActivePanelId] = useState(getActivePanel(menuItems, defaultActivePanelId)?.id);
  const [toggledMenuItemIds, setToggledMenuItemIds] = useState<TPanelItemId[]>(activePanelId ? [activePanelId] : []);
  const setActivePanel = (panelId: TPanelItemId) => setActivePanelId(panelId);

  const toggleMenuItem: MenuItemToggleFn<TPanelItemId> = (menuItemId) => {
    setToggledMenuItemIds((prev) => {
      const idExists = !!prev.find((id) => id == menuItemId);

      if (idExists) {
        return prev.filter((id) => id !== menuItemId);
      }

      return [...prev, menuItemId];
    });
  };

  const untoggleMenuItems = () => setToggledMenuItemIds([]);

  const recomputeActivePanel = useCallback(() => {
    const activePanelId = getActivePanel(menuItems, defaultActivePanelId)?.id;
    setActivePanelId(activePanelId);
    if (activePanelId) {
      setToggledMenuItemIds(prev => prev.includes(activePanelId) ? prev : [...prev, activePanelId]);
    }
  }, []);

  return (
    <PanelSideBarContext.Provider
      value={{
        menuItems,
        setMenuItems,
        activePanelId,
        setActivePanel,
        recomputeActivePanel,
        toggledMenuItemIds,
        toggleMenuItem,
        untoggleMenuItems,
        isSidebarOpen,
        toggleSidebar,
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
