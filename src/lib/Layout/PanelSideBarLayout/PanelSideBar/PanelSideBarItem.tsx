import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useRef, useEffect } from "react";
import { Collapse, NavItem } from "reactstrap";
import { PanelItem } from "./../PanelSideBar/Definitions/PanelItem";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { hasActiveChildren } from "./Utils/getActivePanel";

export interface PanelSideBarItemProps<TPanelItemId extends string, TPanelItem> {
  children: PanelItem<TPanelItemId, TPanelItem>;
  depth?: number;
  active?: boolean;
  isParentHidden?: boolean;
  isIconShownOnSidebarCollapse: boolean;
}

const PanelSidebarItemNavLink = <TPanelItemId extends string, TPanelItem>({
  item,
  collapsedWithIcon,
  className,
}: {
  item: PanelItem<TPanelItemId, TPanelItem>;
  collapsedWithIcon?: boolean;
  className?: string;
}) => {
  const { icon, title, onSidebarCollapseOptions } = item;
  const panelIconClassName = collapsedWithIcon ? "ms-1 me-3 p-1" : "me-2";
  const displayIcon = icon || (collapsedWithIcon && onSidebarCollapseOptions?.fallbackIcon);

  return (
    <span className={className}>
      {displayIcon && <FontAwesomeIcon icon={displayIcon} className={panelIconClassName} />}
      {!collapsedWithIcon || !displayIcon ? title : ""}
    </span>
  );
};

const PanelSideBarItem = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarItemProps<TPanelItemId, TPanelItem>) => {
  const { depth = 0, children: item, isParentHidden = false, isIconShownOnSidebarCollapse } = props;
  const { LinkRenderer, toggledMenuItemIds, toggleMenuItem, hiddenMenuItemIds, isSidebarOpen } = usePanelSideBarContext<
    TPanelItemId,
    TPanelItem
  >();

  const hasItems = !!item.children?.length;
  const isActive = (hasItems && item.children && hasActiveChildren(item.children)) || item.active;
  const isOpen = toggledMenuItemIds?.includes(item.id);
  const scrollToActiveItemRef = useRef<HTMLDivElement>(null);
  const collapsedWithIcon = isIconShownOnSidebarCollapse && !isSidebarOpen;

  useEffect(() => {
    const currentItem = scrollToActiveItemRef.current;

    if (!item.active || !currentItem) {
      return;
    }

    currentItem.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [scrollToActiveItemRef, item.active]);

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
        style={{ paddingLeft: !collapsedWithIcon && depth ? `${depth + 1}rem` : undefined }}
      >
        <div ref={scrollToActiveItemRef}>
          {hasItems ? (
            <div className={classNames("d-flex flex-row", { "justify-content-between": item.collapseIconOnly })}>
              {item.collapseIconOnly && (
                <LinkRenderer item={item}>
                  <PanelSidebarItemNavLink<TPanelItemId, TPanelItem>
                    className="nav-link"
                    item={item}
                    collapsedWithIcon={collapsedWithIcon}
                  />
                </LinkRenderer>
              )}

              <a
                role="button"
                className={classNames(
                  "nav-link",
                  { "w-100": !item.collapseIconOnly },
                  { "dropdown-toggle": hasItems && !collapsedWithIcon },
                )}
                onClick={() => {
                  if (item.collapseIconOnly) {
                    toggleMenuItem(item.id);
                  }
                }}
              >
                {!item.collapseIconOnly && (
                  <PanelSidebarItemNavLink<TPanelItemId, TPanelItem> item={item} collapsedWithIcon={collapsedWithIcon} />
                )}
              </a>
            </div>
          ) : (
            <LinkRenderer item={item}>
              <PanelSidebarItemNavLink<TPanelItemId, TPanelItem> className="nav-link" item={item} collapsedWithIcon={collapsedWithIcon} />
            </LinkRenderer>
          )}
        </div>
      </NavItem>
      {hasItems && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              depth={depth + 1}
              active={item.active}
              isParentHidden={hiddenMenuItemIds.includes(item.id)}
              isIconShownOnSidebarCollapse={isIconShownOnSidebarCollapse}
            >
              {childItem}
            </PanelSideBarItem>
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
