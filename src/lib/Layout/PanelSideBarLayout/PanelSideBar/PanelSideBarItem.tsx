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
}

// eslint-disable-next-line complexity
const PanelSideBarItem = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarItemProps<TPanelItemId, TPanelItem>) => {
  const { depth = 0, children: item } = props;
  const { LinkRenderer, toggledMenuItemIds, toggleMenuItem, hiddenMenuItemIds } = usePanelSideBarContext<TPanelItemId, TPanelItem>();
  const hasitem = !!item.children?.length;
  const isActive = (hasitem && item.children && hasActiveChildren(item.children)) || item.active;
  const isOpen = toggledMenuItemIds?.includes(item.id);
  const scrollToActiveItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToActiveItemRef.current && isActive) {
      scrollToActiveItemRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <NavItem
        hidden={hiddenMenuItemIds.includes(item.id)}
        onClick={() => {
          if(hasitem && !item.collapseIconOnly) {
            toggleMenuItem(item.id)
          }
        }}
        className={classNames({ "menu-open": isOpen, active: isActive })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
        <div ref={scrollToActiveItemRef}>
          {hasitem ? (
            <div className={classNames("d-flex flex-row", { "justify-content-between": item.collapseIconOnly })}>
              {item.collapseIconOnly && (
                <LinkRenderer item={item}>
                  <span className="nav-link">
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                    {item.title}
                  </span>
                </LinkRenderer>
              )}

              <a
                role="button"
                className={classNames("nav-link", { "w-100": !item.collapseIconOnly }, { "dropdown-toggle": hasitem })}
                onClick={() => {
                  if (item.collapseIconOnly) {
                    toggleMenuItem(item.id)
                  }
                }}
              >
                {!item.collapseIconOnly && (
                  <span>
                    {item.icon && <FontAwesomeIcon className="me-2" icon={item.icon} />}
                    {item.title}
                  </span>
                )}
              </a>
            </div>
          ) : (
            <>
              <LinkRenderer item={item}>
                <span className="nav-link">
                  {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                  {item.title}
                </span>
              </LinkRenderer>
            </>
          )}
        </div>
      </NavItem>

      {!hiddenMenuItemIds.includes(item.id) && hasitem && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {/* .filter(x => x.display !== false) */}
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              children={childItem}
              depth={depth + 1}
              active={item.active}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
