import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ComponentType } from "react";
import { Collapse, NavItem } from "reactstrap";
import { LinkRendererProps } from "src/lib/SideBar/SideBarMenuContext";
import {PanelItem} from "src/lib/Layout/PanelSideBarLayout/PanelSideBar/Definitions/PanelSideBarMenuItem";

export interface PanelSideBarItemProps {
  children: PanelItem<unknown>;
  LinkRenderer: ComponentType<LinkRendererProps>;
  onClick?: (menuItem: PanelItem<unknown>) => void;
  depth?: number;
  active?: boolean;
  toggledItemIds: string[];
}

const PanelSideBarItem = (props: PanelSideBarItemProps) => {
  const { depth = 0, children, LinkRenderer, onClick, toggledItemIds = [] } = props;

  const hasChildren = !!children.children?.length;
  const isOpen = toggledItemIds?.includes(children.id) || children.expanded;

  if (children.display === false) {
    return null;
  }

  return (
    <>
      <NavItem
        onClick={() => onClick && onClick(children)}
        className={classNames({ "menu-open": isOpen, active: children.active })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
        {hasChildren ? (
          <div className={classNames({ dropend: !isOpen })}>
            <a role="button" className={classNames("nav-link", { "dropdown-toggle": hasChildren })}>
              {children.icon && <FontAwesomeIcon className="me-2" icon={children.icon as IconProp} />}
              <div className="text-justify">{children.title}</div>
            </a>
          </div>
        ) : (
          <>
            <LinkRenderer item={children}>
              <span className="nav-link">
                {children.icon && <FontAwesomeIcon icon={children.icon as IconProp} className="me-2" />}
                {children.title}
              </span>
            </LinkRenderer>
          </>
        )}
      </NavItem>

      {hasChildren && (
        <Collapse isOpen={isOpen} navbar className={classNames("items-menu", { "mb-1": isOpen })}>
          {children.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              children={childItem}
              LinkRenderer={LinkRenderer}
              onClick={() => onClick && onClick(childItem)}
              depth={depth + 1}
              active={children.active}
              toggledItemIds={toggledItemIds}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
