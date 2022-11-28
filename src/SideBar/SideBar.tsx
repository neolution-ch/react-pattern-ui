import React, { FC } from "react";
import classNames from "classnames";
import { SideBarMenu } from "components/Layout/SideBar/Index";

interface SideBarProps {
  isOpen: boolean;
  toggle: () => void;
}

const SideBar: FC<SideBarProps> = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <div className="m-3">
        <img alt="logo" src="/images/neolution.png" className="img-fluid" />
      </div>
    </div>
    <div className="side-menu">
      <SideBarMenu sideBarCollapsed={!isOpen}></SideBarMenu>
    </div>
  </div>
);

export { SideBar };
