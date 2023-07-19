import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import { DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from "reactstrap";
import "../../../styles/Layout/PanelSideBarLayout.scss";
import { PanelSideBar } from "./PanelSideBar/PanelSidebar";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { usePanelSideBarLayoutContext } from "./Context/PanelSideBarLayoutContext";
import { PanelSideBarToggle } from "./PanelSideBar/PanelSideBarToggle";
import { PanelItem } from "./PanelSideBar/Definitions/PanelSideBarMenuItem";

export interface PanelSideBarLayoutProps extends PropsWithChildren {
  /**
   * Local panel items to display.
   */
  localItems?: PanelItem[];
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
  const { brand, children, footer, localItems = [], collapsible = true } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const {
    brand: contextBrand,
    footer: contextFooter,
    userDropDownMenu,
    userDropDownMenuToggle,
    topBarCustomItems = [],
  } = usePanelSideBarLayoutContext();

  return (
    <>
      <nav id="nav-top" className="panel-layout navbar navbar-expand">
        {/* Navbar Brand */}
        <div className="navbar-brand">{brand ?? contextBrand}</div>

        {/* <NavbarUser /> */}
        <Nav className="navbar-user" vertical>
          {/*Other Custom Menu*/}
          {topBarCustomItems?.map((item) => (
            <NavItem>{item}</NavItem>
          ))}
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
        <PanelSideBar localItems={localItems} />
        {collapsible === true && <PanelSideBarToggle onClick={toggleSidebar} toggled={!isOpen} />}
        <PanelSideBarLayoutContent footer={footer ?? contextFooter}>{children}</PanelSideBarLayoutContent>
      </section>
    </>
  );
};
