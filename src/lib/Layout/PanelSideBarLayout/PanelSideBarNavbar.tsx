import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { Nav, NavItem } from "@neolution-ch/reactstrap";
import classNames from "classnames";
import { SidebarProps } from "./PanelSideBar/Context/PanelSideBarContextProps";

export interface PanelSidebarNavbarInternalProps extends Pick<Partial<SidebarProps>, "theme" | "toggleSidebar"> {
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

const PanelSidebarNavbarInternal = (props: PanelSidebarNavbarInternalProps) => {
  const { brand, navbarRightItems, navbarLeftItems, useToggleButton, toggleSidebar, theme } = props;

  if (useToggleButton && !toggleSidebar) {
    throw new Error("You must provide the toggleSidebar function when useToggleButton is true.");
  }

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
        <button id="sidebar-toggle" className="btn btn-link btn-sm order-0 me-lg-0" onClick={() => toggleSidebar && toggleSidebar()}>
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

export type PanelSidebarNavbarProps = Omit<PanelSidebarNavbarInternalProps, "toggleSidebar" | "useToggleButton">;

const PanelSidebarNavbar = (props: PanelSidebarNavbarProps) => {
  return <PanelSidebarNavbarInternal {...props} useToggleButton={false} />;
};

export { PanelSidebarNavbarInternal, PanelSidebarNavbar };
