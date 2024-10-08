import classNames from "classnames";
import { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import "../../../../styles/Layout/index.scss";
import { PanelSideBar } from "./PanelSideBar/PanelSidebar";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { PanelSideBarToggle } from "./PanelSideBar/PanelSideBarToggle";
import { PanelSidebarNavbar } from "./PanelSideBarNavbar";
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
   * Enable scrolling to top each time the active panel change
   */
  scroolToTopOnActivePanelChange?: boolean;

   /**
   * the body ref
   */
  bodyRef?: MutableRefObject<HTMLElement | null>;
}

export const PanelSideBarLayout = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarLayoutProps) => {
  const {
    brand,
    children,
    navbarLeftItems,
    navbarRightItems,
    footer = undefined,
    collapsible = true,
    useToggleButton = false,
    useResponsiveLayout = false,
    bodyRef
  } = props;

  const { isSidebarOpen, toggleSidebar, renderFirstItemsLevelAsTiles } = usePanelSideBarContext<TPanelItemId, TPanelItem>();

  if (useResponsiveLayout && !useToggleButton) {
    throw new Error("Responsive layout can be used only with toggle button in the navbar!");
  }

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
        <PanelSideBar<TPanelItemId, TPanelItem> />
        {collapsible && !useToggleButton && <PanelSideBarToggle onClick={toggleSidebar} toggled={!isSidebarOpen} />}
        <PanelSideBarLayoutContent footer={footer} bodyRef={bodyRef}>{children}</PanelSideBarLayoutContent>
      </section>
    </>
  );
};
