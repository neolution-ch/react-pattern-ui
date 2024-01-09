import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ComponentType, useState } from "react";
import { Collapse, NavItem } from "reactstrap";
import { LinkRendererProps } from "src/lib/SideBar/SideBarMenuContext";
import { PanelItem } from "./../PanelSideBar/Definitions/PanelItem";

export interface PanelSideBarItemProps {
  children: PanelItem<unknown>;
  LinkRenderer: ComponentType<LinkRendererProps>;
  onClick?: (menuItem: PanelItem<unknown>) => void;
  depth?: number;
  active?: boolean;
  toggledItemIds: string[];
  toggledSidebar: boolean;
}

const PanelSideBarItem = (props: PanelSideBarItemProps) => {
  const { depth = 0, children: item, LinkRenderer, onClick, toggledItemIds = [], toggledSidebar } = props;

  const hasitem = !!item.children?.length;
  const [isOpen, setIsOpen] = useState(toggledItemIds?.includes(item.id) || item.expanded);
  if (item.display === false) {
    return null;
  }

  return (
    <>
      <NavItem
        onClick={() => onClick && onClick(item)}
        className={classNames({ "menu-open": isOpen, active: item.children?.find((s) => s.active) || item.active })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
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
      </NavItem>

      {hasitem && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              children={childItem}
              LinkRenderer={LinkRenderer}
              onClick={() => onClick && onClick(childItem)}
              depth={depth + 1}
              active={item.active}
              toggledItemIds={toggledItemIds}
              toggledSidebar={toggledSidebar}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
