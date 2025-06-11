import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { Nav, NavItem } from "reactstrap";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";
import classNames from "classnames";

interface PanelSidebarNavbarProps {
  /**
   * The brand content shown on the top navigation bar.
   */
  brand?: ReactNode;
  /**
   * The menu content on the right.
   */
  navbarLeftItems?: ReactNode[];
  /**
   * The menu content on the left.
   */
  navbarRightItems?: ReactNode[];

  /**
   * The menu content on the left.
   */
  useToggleButton?: boolean;
}

const PanelSidebarNavbar = (props: PanelSidebarNavbarProps) => {
  const { brand, navbarRightItems, navbarLeftItems, useToggleButton } = props;
  const { toggleSidebar, theme } = usePanelSideBarContext();
  return (
    <nav
      id="nav-top"
      className={classNames(
        "panel-layout navbar navbar-expand",
        { "navbar-dark": theme === "dark" },
        { "navbar-light": theme === "light" },
        { "navbar-blue": theme === "blue" },
      )}
    >
      <div className="navbar-brand">{brand}</div>
      {useToggleButton && (
        <button id="sidebar-toggle" className="btn btn-link btn-sm order-0 me-lg-0" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}
      <Nav tag="div" className="top-navbar flex-row justify-content-between">
        <span className="d-flex flex-row justify-content-start align-items-center">
          {navbarLeftItems?.map((item, index) => (
            <NavItem tag="div" key={index} className="navbar-custom-item">
              {item}
            </NavItem>
          ))}
        </span>
        <span className="d-flex flex-row justify-content-end align-items-center">
          {navbarRightItems?.map((item, index) => (
            <NavItem tag="div" key={index} className="navbar-custom-item">
              {item}
            </NavItem>
          ))}
        </span>
      </Nav>
    </nav>
  );
};

export { PanelSidebarNavbar };
