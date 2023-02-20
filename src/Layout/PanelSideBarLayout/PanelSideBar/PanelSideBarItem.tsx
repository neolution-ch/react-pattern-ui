import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ComponentType } from "react";
import { Collapse, NavItem } from "reactstrap";
import { LinkRendererProps } from "src/SideBar/SideBarMenuContext";
import { PanelMenuItem } from "./Definitions/PanelSideBarMenuItem";

export interface PanelSideBarItemProps {
  item: PanelMenuItem<unknown>;
  LinkRenderer: ComponentType<LinkRendererProps>;
  onClick: (menuItem: PanelMenuItem<unknown>) => void;
  depth?: number;
}

export const PanelSideBarItem = (props: PanelSideBarItemProps) => {
  const { depth = 0, item, LinkRenderer, onClick } = props;

  const hasChildren = !!item.children?.length;
  const isOpen = item.expanded === true;

  if (item.display === false) {
    return null;
  }

  return (
    <>
      <NavItem
        onClick={() => onClick(item)}
        className={classNames({ "menu-open": isOpen })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
        {hasChildren ? (
          <div className={classNames({ dropend: !isOpen })}>
            <a role="button" className={classNames("nav-link", { "dropdown-toggle": hasChildren })}>
              {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} fixedWidth />}
              <div className="text-justify">{item.title}</div>
            </a>
          </div>
        ) : (
          <>
            <LinkRenderer item={item}>
              <span className="nav-link">
                {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                {item.title}
              </span>
            </LinkRenderer>
          </>
        )}
      </NavItem>

      {hasChildren && (
        <Collapse isOpen={isOpen} navbar className={classNames("items-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem) => (
            <PanelSideBarItem
              key={childItem.id}
              item={childItem}
              LinkRenderer={LinkRenderer}
              onClick={() => onClick(childItem)}
              depth={depth + 1}
            />
          ))}
        </Collapse>
      )}
    </>
  );
};
