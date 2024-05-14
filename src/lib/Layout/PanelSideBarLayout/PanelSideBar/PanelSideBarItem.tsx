import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import { Collapse, NavItem } from "reactstrap";
import { PanelItem } from "./../PanelSideBar/Definitions/PanelItem";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { hasActiveChildren } from "./Utils/getActivePanel";

export interface PanelSideBarItemProps<TPanelItemId extends string, TPanelItem> {
  children: PanelItem<TPanelItemId, TPanelItem>;
  onClick?: (menuItemId: TPanelItemId) => void;
  depth?: number;
  active?: boolean;
  toggledItemIds: string[];
}

// eslint-disable-next-line complexity
const PanelSideBarItem = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarItemProps<TPanelItemId, TPanelItem>) => {
  const { depth = 0, children: item, onClick, toggledItemIds = [] } = props;
  const { LinkRenderer } = usePanelSideBarContext<TPanelItemId, TPanelItem>();
  const hasitem = !!item.children?.length;
  const isActive = (hasitem && item.children && hasActiveChildren(item.children)) || item.active;
  const [isOpen, setIsOpen] = useState(isActive || toggledItemIds?.includes(item.id) || item.expanded);
  if (item.display === false) {
    return null;
  }
  const scrollToActiveItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToActiveItemRef.current && isActive) {
      scrollToActiveItemRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <NavItem
        onClick={() => onClick && onClick(item.id)}
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
                onClick={() => setIsOpen(!isOpen)}
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

      {hasitem && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              children={childItem}
              onClick={() => onClick && onClick(childItem.id)}
              depth={depth + 1}
              active={item.active}
              toggledItemIds={toggledItemIds}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
