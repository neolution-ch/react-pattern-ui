import React, { FC, useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ISideBarMenuItem } from "components/Layout/SideBar/Index";

interface SubMenuProps {
  item: ISideBarMenuItem;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { item } = props;

  return (
    <div>
      <NavItem onClick={toggle} className={classNames({ "menu-open": !collapsed })}>
        <a role="button" className="nav-link dropdown-toggle">
          {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
          {item.title}
        </a>
      </NavItem>
      <Collapse isOpen={!collapsed} navbar className={classNames("items-menu", { "mb-1": !collapsed })}>
        {item.children?.map((item, index) => (
          <NavItem key={index} className="ps-4">
            <Link className="nav-link" href="/a">
              {item.title}
            </Link>
          </NavItem>
        ))}
      </Collapse>
    </div>
  );
};

export default SubMenu;
