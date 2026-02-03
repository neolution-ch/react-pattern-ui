import classNames from "classnames";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";
import { PanelItemsRenderer } from "./PanelItemsRenderer";
import { useRef } from "react";

interface PanelSideBarProps {
  isIconShownOnSidebarCollapse: boolean;
  scrollActiveItemToCenter: boolean;
}

export const PanelSideBar = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarProps) => {
  const { isIconShownOnSidebarCollapse, scrollActiveItemToCenter } = props;
  const {
    activePanelId,
    menuItems,
    setActivePanel,
    renderFirstItemsLevelAsTiles,
    renderTilesAsLinks,
    LinkRenderer,
    theme,
    hiddenMenuItemIds,
  } = usePanelSideBarContext<TPanelItemId, TPanelItem>();
  const sideNavRef = useRef<HTMLElement>(null);

  const className = classNames(
    "panel-layout",
    { "sidenav-dark": theme === "dark" },
    { "sidenav-light": theme === "light" },
    { "sidenav-blue": theme === "blue" },
    { "show-icons": isIconShownOnSidebarCollapse },
  );

  const activePanel: PanelItem<TPanelItemId, TPanelItem> | undefined = menuItems.find((x) => x.id === activePanelId);

  if (renderFirstItemsLevelAsTiles) {
    if (menuItems.some((x) => !x.icon)) {
      throw new Error("Outer panel icon is required");
    }

    return (
      <nav id="side-nav" className={className} ref={sideNavRef}>
        <div className="side-nav__tiles">
          {
            <PanelItemsRenderer
              items={menuItems}
              LinkRenderer={LinkRenderer}
              hiddenMenuItemIds={hiddenMenuItemIds}
              setActivePanel={setActivePanel}
              activePanelId={activePanelId}
              renderTilesAsLinks={renderTilesAsLinks}
            />
          }
        </div>
        <div className="side-nav__items">
          {activePanel?.children?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem>
              key={item.id}
              isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse}
              scrollActiveItemToCenter={scrollActiveItemToCenter}
              sideNavRef={sideNavRef}
            >
              {item}
            </PanelSideBarItem>
          ))}
        </div>
      </nav>
    );
  } else {
    return (
      <nav id="side-nav" className={className} ref={sideNavRef}>
        <div className="side-nav__items">
          {menuItems?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem>
              key={item.id}
              isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse}
              scrollActiveItemToCenter={scrollActiveItemToCenter}
              sideNavRef={sideNavRef}
            >
              {item}
            </PanelSideBarItem>
          ))}
        </div>
      </nav>
    );
  }
};
