import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {ComponentType, useState} from "react";
import {Collapse, NavItem, Row, Col} from "reactstrap";
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
  const { depth = 0, children: item, LinkRenderer, onClick, toggledItemIds = [] } = props;

  const hasitem = !!item.children?.length;
  const [isOpen, setIsOpen] = useState(toggledItemIds?.includes(item.id) || item.expanded);
  if (item.display === false) {
    return null;
  }

  return (
    <>
      <NavItem
        onClick={() => onClick && onClick(item)}
        className={classNames({ "menu-open": isOpen, active: item?.children ? item.children?.find(s => s.active) : item.active })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
        {hasitem ? (
          <Row>
            <Col lg={10} xs={10}>
              <a role="button" className={classNames("nav-link")}>
              {item.icon && <FontAwesomeIcon className="me-2" icon={item.icon} />}
              <div className="text-justify">{item.title}</div>
            </a>
            </Col>
            <Col lg={2} xs={2} onClick={() => setIsOpen(!isOpen)} role="button">
              <div style={{alignItems: "normal"}} className={classNames("nav-link", { "dropdown-toggle": hasitem })}></div>
            </Col>
          </Row>
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
            />
          ))}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
