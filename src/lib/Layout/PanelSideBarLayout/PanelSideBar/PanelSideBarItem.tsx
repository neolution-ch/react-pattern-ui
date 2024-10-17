import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useRef, useEffect, ReactNode } from "react";
import { Collapse, NavItem } from "reactstrap";
import { PanelItem } from "./../PanelSideBar/Definitions/PanelItem";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { hasActiveChildren } from "./Utils/getActivePanel";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface PanelSideBarItemProps<TPanelItemId extends string, TPanelItem> {
  children: PanelItem<TPanelItemId, TPanelItem>;
  depth?: number;
  active?: boolean;
  isParentHidden?: boolean;
}

const PanelSidebarItemNavLink = ({ icon, title, collapsedWithIcons }: { icon?: IconProp, title: ReactNode, collapsedWithIcons?: boolean }) => {
  const iconClassName = collapsedWithIcons ? "ms-1 me-3 p-1" : "me-2";
  return (
    <span className="nav-link">
      {icon && <FontAwesomeIcon icon={icon} className={iconClassName} />}
      {collapsedWithIcons && icon ? "" : title}
    </span>
  );
}

// eslint-disable-next-line complexity
const PanelSideBarItem = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarItemProps<TPanelItemId, TPanelItem>) => {
  const { depth = 0, children: item, isParentHidden = false } = props;
  const { LinkRenderer, toggledMenuItemIds, toggleMenuItem, hiddenMenuItemIds, activePanelShowIconsOnCollapse, isSidebarOpen } = usePanelSideBarContext<TPanelItemId, TPanelItem>();
  const hasItems = !!item.children?.length;
  const isActive = (hasItems && item.children && hasActiveChildren(item.children)) || item.active;
  const isOpen = toggledMenuItemIds?.includes(item.id);
  const scrollToActiveItemRef = useRef<HTMLDivElement>(null);
  const collapsedWithIcons = activePanelShowIconsOnCollapse && !isSidebarOpen;

  useEffect(() => {
    if (scrollToActiveItemRef.current && isActive) {
      scrollToActiveItemRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <NavItem
        hidden={isParentHidden || hiddenMenuItemIds.includes(item.id)}
        onClick={() => {
          if (hasItems && !item.collapseIconOnly) {
            toggleMenuItem(item.id);
          }
        }}
        className={classNames({ "menu-open": isOpen, active: isActive })}
        style={{ paddingLeft: !collapsedWithIcons && depth ? `${depth + 1}rem` : undefined }}
      >
        <div ref={scrollToActiveItemRef}>
          {hasItems ? (
            <div className={classNames("d-flex flex-row", { "justify-content-between": item.collapseIconOnly })}>
              {item.collapseIconOnly && (
                <LinkRenderer item={item}>
                  <PanelSidebarItemNavLink icon={item.icon} title={item.title} collapsedWithIcons={collapsedWithIcons} />
                </LinkRenderer>
              )}

              <a
                role="button"
                className={classNames("nav-link", { "w-100": !item.collapseIconOnly }, { "dropdown-toggle": hasItems && !collapsedWithIcons })}
                onClick={() => {
                  if (item.collapseIconOnly) {
                    toggleMenuItem(item.id);
                  }
                }}
              >
                {!item.collapseIconOnly && (
                  <PanelSidebarItemNavLink icon={item.icon} title={item.title} collapsedWithIcons={collapsedWithIcons} />
                )}
              </a>
            </div>
          ) : (
            <>
              <LinkRenderer item={item}>
                <PanelSidebarItemNavLink icon={item.icon} title={item.title} collapsedWithIcons={collapsedWithIcons} />
              </LinkRenderer>
            </>
          )}
        </div>
      </NavItem>
      {hasItems && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              children={childItem}
              depth={depth + 1}
              active={item.active}
              isParentHidden={hiddenMenuItemIds.includes(item.id)}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
