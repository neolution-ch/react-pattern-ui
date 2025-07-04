import classNames from "classnames";
import { PropsWithChildren, ReactNode, useMemo } from "react";
import "../../../../styles/Layout/index.scss";
import { PanelSideBar } from "./PanelSideBar/PanelSidebar";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { PanelSideBarToggle } from "./PanelSideBar/PanelSideBarToggle";
import { PanelSidebarNavbarInternal, PanelSidebarNavbarInternalProps } from "./PanelSideBarNavbar";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

export interface PanelSideBarLayoutProps extends PropsWithChildren {
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
   * If using the toggle button instead of the side menu adiacent bar.
   */
  useToggleButton?: boolean;

  /**
   * If use the responsive layout when the screen is sm in order to remove the sidebar overlay.
   */
  useResponsiveLayout?: boolean;

  /**
   * If true, exclude the sidebar menu.
   */
  excludeSibebarMenu?: boolean;
}

const PanelSidebarNavbar = (props: Omit<PanelSidebarNavbarInternalProps, "toggleSidebar" | "theme">) => {
  const { toggleSidebar, theme } = usePanelSideBarContext();

  return <PanelSidebarNavbarInternal toggleSidebar={toggleSidebar} theme={theme} {...props} />;
};

export const PanelSideBarLayout = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarLayoutProps) => {
  const {
    brand,
    children,
    navbarLeftItems,
    navbarRightItems,
    footer,
    collapsible = true,
    useToggleButton = false,
    useResponsiveLayout = false,
    excludeSibebarMenu = false,
  } = props;

  const { isSidebarOpen, toggleSidebar, renderFirstItemsLevelAsTiles, menuItems, activePanelId } = usePanelSideBarContext<
    TPanelItemId,
    TPanelItem
  >();

  if (useResponsiveLayout && !useToggleButton) {
    throw new Error("Responsive layout can be used only with toggle button in the navbar!");
  }

  const isIconShownOnSidebarCollapse = useMemo(
    () => menuItems.find((x) => x.id === activePanelId)?.onSidebarCollapseOptions?.showIcon ?? false,
    [menuItems, activePanelId],
  );

  return (
    <>
      <PanelSidebarNavbar
        useToggleButton={useToggleButton}
        brand={brand}
        navbarRightItems={navbarRightItems}
        navbarLeftItems={navbarLeftItems}
      />
      <section
        id="main-section"
        className={classNames(
          { toggled: !isSidebarOpen },
          { "responsive-layout": useResponsiveLayout },
          { "section-no-tiles": !renderFirstItemsLevelAsTiles },
          { "section-tiles": renderFirstItemsLevelAsTiles },
        )}
      >
        {!excludeSibebarMenu && (
          <>
            <PanelSideBar<TPanelItemId, TPanelItem> isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse} />
            {collapsible && !useToggleButton && (
              <PanelSideBarToggle
                onClick={toggleSidebar}
                toggled={!isSidebarOpen}
                isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse}
              />
            )}
          </>
        )}
        <PanelSideBarLayoutContent
          excludeSibebarMenu={excludeSibebarMenu}
          footer={footer}
          isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse}
        >
          {children}
        </PanelSideBarLayoutContent>
      </section>
    </>
  );
};
