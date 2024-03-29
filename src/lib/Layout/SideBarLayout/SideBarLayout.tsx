import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from "reactstrap";
import SideBarMenu from "src/lib/SideBar/SideBarMenu";
import "../../../../styles/Layout/SideBarLayout.scss";
import { SideBarLayoutContent } from "./SideBarLayoutContent";
import { useSideBarLayoutContext } from "./SideBarLayoutContext";

interface SideBarLayoutProps extends PropsWithChildren {
  brand?: ReactNode;
  footer?: ReactNode;
  theme?: "dark" | "light";
}

const SideBarLayout = (props: SideBarLayoutProps) => {
  const { brand, children, footer, theme } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const { brand: contextBrand, theme: contextTheme, userDropDownMenu, userDropDownMenuToggle } = useSideBarLayoutContext();
  const chosenTheme = theme ?? contextTheme;

  return (
    <>
      <nav id="nav-top" className={`navbar navbar-expand navbar-${chosenTheme}`}>
        {/* Navbar Brand*/}
        <div className="navbar-brand">{brand ?? contextBrand}</div>

        {/* Sidebar Toggle*/}
        <button id="sidebar-toggle" className="btn btn-link btn-sm order-0 me-lg-0" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>

        {/* <NavbarUser /> */}
        <Nav className="navbar-user">
          <NavItem>
            <UncontrolledDropdown direction="start">
              <DropdownToggle nav className="user-dropdown">
                {userDropDownMenuToggle}
              </DropdownToggle>
              <div>
                <DropdownMenu end>{userDropDownMenu}</DropdownMenu>
              </div>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </nav>
      <section id="layout-sidenav" className={classNames({ toggled: !isOpen })}>
        <SideBarMenu theme={chosenTheme} />
        <SideBarLayoutContent footer={footer}>{children}</SideBarLayoutContent>
      </section>
    </>
  );
};

export { SideBarLayout, SideBarLayoutProps };
