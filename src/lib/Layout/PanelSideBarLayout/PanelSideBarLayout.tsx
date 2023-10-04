import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from "reactstrap";
import "../../../../styles/Layout/PanelSideBarLayout.scss";
import { PanelSideBar } from "./PanelSideBar/PanelSidebar";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { PanelSideBarToggle } from "./PanelSideBar/PanelSideBarToggle";
import { usePanelSideBarContext } from "src/lib/Layout/PanelSideBarLayout/PanelSideBar/Context/PanelSideBarContext";

export interface PanelSideBarLayoutProps extends PropsWithChildren {
  /**
   * The brand content shown on the top navigation bar.
   */
  brand?: ReactNode;
  /**
   * The footer content.
   */
  footer?: ReactNode;
  /**
   * The collapsible option to choose.
   */
  collapsible?: boolean;
}

export const PanelSideBarLayout = (props: PanelSideBarLayoutProps) => {
  const { brand, children, footer, collapsible = true } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const {
    brand: contextBrand,
    footer: contextFooter,
    userDropDownMenu,
    userDropDownMenuToggle,
    topBarRightCustomItems = [],
    topBarLeftCustomItems = [],
  } = usePanelSideBarContext();

  return (
    <>
      <nav id="nav-top" className="panel-layout navbar navbar-expand">
        {/* Navbar Brand */}
        <div className="navbar-brand">{brand ?? contextBrand}</div>
        <Nav className="navbar-user flex-row justify-content-start align-items-center" style={{ marginLeft: 35 }}>
          {/*Left Custom Menu*/}
          {topBarLeftCustomItems?.map((item, index) => (
            <NavItem key={index} className="navbar-custom-item">
              {item}
            </NavItem>
          ))}
        </Nav>
        <Nav className="navbar-user flex-row justify-content-end align-items-center" style={{ marginRight: 48 }}>
          {/*Right Custom Menu*/}
          {topBarRightCustomItems?.map((item, index) => (
            <NavItem key={index} className="navbar-custom-item">
              {item}
            </NavItem>
          ))}
          {/* <NavbarUser /> */}
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

      <section className={classNames({ toggled: !isOpen })}>
        <PanelSideBar />
        {collapsible === true && <PanelSideBarToggle onClick={toggleSidebar} toggled={!isOpen} />}
        <PanelSideBarLayoutContent footer={footer ?? contextFooter}>{children}</PanelSideBarLayoutContent>
      </section>
    </>
  );
};
