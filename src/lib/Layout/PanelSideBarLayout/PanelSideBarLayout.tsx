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

  const [isUserOpen, setIsUserOpen] = useState(false);

  const {
    brand: contextBrand,
    footer: contextFooter,
    userDropDownMenu,
    userDropDownMenuToggle,
    topBarRightCustomItems = [],
    topBarLeftCustomItems = [],
    renderFirstItemsLevelAsTiles,
  } = usePanelSideBarContext();

  return (
    <>
      <nav id="nav-top" className="panel-layout navbar navbar-expand">
        {/* Navbar Brand */}
        <div className="navbar-brand">{brand ?? contextBrand}</div>
        <Nav tag="div" className="navbar-user flex-row justify-content-between" style={{ marginLeft: 35, marginRight: 48 }}>
          <span className="d-flex flex-row justify-content-start align-items-center">
            {/*Left Custom Menu*/}
            {topBarLeftCustomItems?.map((item, index) => (
              <NavItem tag="div" key={index} className="navbar-custom-item">
                {item}
              </NavItem>
            ))}
          </span>
          <span className="d-flex flex-row justify-content-end align-items-center">
            {/*Right Custom Menu*/}
            {topBarRightCustomItems?.map((item, index) => (
              <NavItem tag="div" key={index} className="navbar-custom-item">
                {item}
              </NavItem>
            ))}
            {/*Navbar user*/}
            <NavItem tag="div">
              <UncontrolledDropdown direction="start" isOpen={isUserOpen}>
                <DropdownToggle nav className="user-dropdown" onClick={() => setIsUserOpen(!isUserOpen)}>
                  {userDropDownMenuToggle}
                </DropdownToggle>
                <div>
                  <DropdownMenu end>{userDropDownMenu}</DropdownMenu>
                </div>
              </UncontrolledDropdown>
            </NavItem>
          </span>
        </Nav>
      </nav>

      <section className={`${renderFirstItemsLevelAsTiles ? "section-tiles" : "section-no-tiles" } ${classNames({ toggled: !isOpen })}`}>
        <PanelSideBar />
        {collapsible && <PanelSideBarToggle onClick={toggleSidebar} toggled={!isOpen} />}
        <PanelSideBarLayoutContent footer={footer ?? contextFooter}>{children}</PanelSideBarLayoutContent>
      </section>
    </>
  );
};
