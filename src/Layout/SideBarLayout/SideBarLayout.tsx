import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import SideBarMenu from "src/SideBar/SideBarMenu";
import "../../../styles/Layout/SideBarLayout.scss";
import { SideBarLayoutContent } from "./SideBarLayoutContent";

interface SideBarLayoutProps extends PropsWithChildren {}

export const SideBarLayout = (props: SideBarLayoutProps) => {
  const { children } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <a className="navbar-brand ps-3" href="index.html">
          Start Bootstrap
        </a>
        {/* Sidebar Toggle*/}
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* <NavbarUser /> */}
      </nav>
      <div id="layoutSidenav" className={classNames({ toggled: !isOpen })}>
        <SideBarMenu />
        <SideBarLayoutContent>{children}</SideBarLayoutContent>
      </div>
    </>
  );
};
