import { PanelItem } from "../Definitions/PanelItem";
import { PanelLinkRenderer } from "../Definitions/PanelLinkRenderer";
import { MenuItemToggleFn } from "./PanelSideBarContext";

export interface PanelSideBarContextProps<TPanelItemId extends string, TPanelItem> {
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
   * The default active panel id that will be taken if no active panel is dinamically found
   */
  defaultActivePanelId?: TPanelItemId;

  /**
   * Function for untoggling all menu items
   */
  untoggleMenuItems: () => void;

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

  openMenuItems: (panelItemIds: TPanelItemId[]) => void;
  closeMenuItems: (panelItemIds: TPanelItemId[]) => void;
}
