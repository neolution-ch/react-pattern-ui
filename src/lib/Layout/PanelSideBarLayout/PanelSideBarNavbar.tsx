import { ReactNode } from "react";
import { Nav, NavItem } from "reactstrap";

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
}

const PanelSidebarNavbar = (props: PanelSidebarNavbarProps) => {
  const { brand, navbarRightItems, navbarLeftItems } = props;
  return (
    <nav id="nav-top" className="panel-layout navbar navbar-expand">
      {/* Navbar Brand */}
      <div className="navbar-brand">{brand}</div>
      <Nav tag="div" className="navbar-user flex-row justify-content-between" style={{ marginLeft: 35, marginRight: 48 }}>
        <span className="d-flex flex-row justify-content-start align-items-center">
          {/*Left Custom Menu*/}
          {navbarLeftItems?.map((item, index) => (
            <NavItem tag="div" key={index} className="navbar-custom-item">
              {item}
            </NavItem>
          ))}
        </span>
        <span className="d-flex flex-row justify-content-end align-items-center">
          {/*Right Custom Menu*/}
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
