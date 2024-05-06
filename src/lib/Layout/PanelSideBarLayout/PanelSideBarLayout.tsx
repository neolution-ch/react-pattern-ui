import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import "../../../../styles/Layout/PanelSideBarLayout.scss";
import { PanelSideBar } from "./PanelSideBar/PanelSidebar";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { PanelSideBarToggle } from "./PanelSideBar/PanelSideBarToggle";
import { PanelSidebarNavbar } from "./PanelSideBarNavbar";
import { PanelLinkRenderer } from "./PanelSideBar/Definitions/PanelLinkRenderer";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

export interface PanelSideBarLayoutProps<TPanelItemId extends string, TPanelItem> extends PropsWithChildren {
  /**
   * The brand content shown on the top navigation bar.
   */
  brand?: ReactNode;
  /**
   * The footer content.
   */
  footer?: ReactNode;
  /**
   * The collapsible option to choose.
   */
  collapsible?: boolean;
  /**
   * The navbar content on the right.
   */
  navbarRightItems?: ReactNode[];
  /**
   * The navbar content on the left.
   */
  navbarLeftItems?: ReactNode[];

  /**
   * The theme
   */
  theme?: "light";

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
}

export const PanelSideBarLayout = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarLayoutProps<TPanelItemId, TPanelItem>) => {
  const {
    brand,
    children,
    navbarLeftItems,
    navbarRightItems,
    footer = undefined,
    collapsible = true,
    renderFirstItemsLevelAsTiles,
  } = props;

  const { isSidebarOpen, toggleSidebar } = usePanelSideBarContext<TPanelItemId, TPanelItem>();

  return (
    <>
      <PanelSidebarNavbar brand={brand} navbarRightItems={navbarRightItems} navbarLeftItems={navbarLeftItems} />
      <section
        className={classNames(
          { toggled: !isSidebarOpen },
          { "section-no-tiles": !renderFirstItemsLevelAsTiles },
          { "section-tiles": renderFirstItemsLevelAsTiles },
        )}
      >
        <PanelSideBar<TPanelItemId, TPanelItem> {...props} />
        {collapsible && <PanelSideBarToggle onClick={toggleSidebar} toggled={!isSidebarOpen} />}
        <PanelSideBarLayoutContent footer={footer}>{children}</PanelSideBarLayoutContent>
      </section>
    </>
  );
};
