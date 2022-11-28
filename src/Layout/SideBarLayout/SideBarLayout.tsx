import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PropsWithChildren, ReactNode, useState } from "react";
import SideBarMenu from "src/SideBar/SideBarMenu";
import "../../../styles/Layout/SideBarLayout.scss";
import { SideBarLayoutContent } from "./SideBarLayoutContent";

interface SideBarLayoutProps extends PropsWithChildren {
  brand?: ReactNode;
}

export const SideBarLayout = (props: SideBarLayoutProps) => {
  const { brand, children } = props;

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <div className="navbar-brand">{brand}</div>

        {/* Sidebar Toggle*/}
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* <NavbarUser /> */}
      </nav>
      <section id="layout-sidenav" className={classNames({ toggled: !isOpen })}>
        <SideBarMenu />
        <SideBarLayoutContent>{children}</SideBarLayoutContent>
      </section>
    </>
  );
};
