import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { PanelItem } from "../Definitions/PanelItem";
import { PanelLinkRenderer } from "../Definitions/PanelLinkRenderer";
import { MenuItemToggleFn } from "./PanelSideBarContext";

export interface SidebarProps {
  /**
   * If the sidebar is currently open or not
   */
  isSidebarOpen: boolean;

  /**
   * Function for toggling sidebar
   */
  toggleSidebar: () => void;

  /**
   * The theme
   */
  theme?: "light" | "dark" | "blue";
}

export interface PanelSideBarContextProps<TPanelItemId extends string, TPanelItem> extends SidebarProps {
  /**
   * The active panel id.
   */
  activePanelId?: TPanelItemId;
  /**
   * The menu items.
   */
  menuItems: PanelItem<TPanelItemId, TPanelItem>[];

  /**
   * The function used to set a panel as active
   * @param panelId The panel item identifier
   */
  setActivePanel: (panelId: TPanelItemId) => void;
  /**
   * The list of toggled menu item identifier
   */
  toggledMenuItemIds: string[];
  /**
   * The function used to toggle a menu item
   */
  toggleMenuItem: MenuItemToggleFn<TPanelItemId>;

  /**
   * The default active panel id that will be taken if no active panel is dynamically found
   */
  defaultActivePanelId?: TPanelItemId;

  /**
   * Function for untoggling all menu items
   */
  untoggleMenuItems: () => void;

  /**
   * Boolean indicating if you want to render first items level as icons or directly as menu entries
   */
  renderFirstItemsLevelAsTiles?: boolean;

  /**
   * Boolean indicating if you want to render first level items as links or as button
   */
  renderTilesAsLinks?: boolean;
  /**
   * The component used to render the menu item links.
   */
  LinkRenderer: PanelLinkRenderer<TPanelItemId, TPanelItem>;

  /**
   * The list of toggled menu item identifier
   */
  hiddenMenuItemIds: TPanelItemId[];

  /**
   * Function to get the hidden menu items
   */
  setHiddenMenuItemsIds: Dispatch<SetStateAction<TPanelItemId[]>>;

  /**
   * Function to open menu items
   * @param panelItemIds the panel item identifiers to open
   */
  openMenuItems: (panelItemIds: TPanelItemId[]) => void;

  /**
   * Function to close menu items
   * @param panelItemIds the panel item identifiers to close
   * @param includeActivePanel whether needs to include the active panel
   */
  closeMenuItems: (panelItemIds: TPanelItemId[], includeActivePanel?: boolean) => void;

  /**
   * the main content body ref
   */
  mainContentBodyRef: MutableRefObject<HTMLElement | null>;
}
