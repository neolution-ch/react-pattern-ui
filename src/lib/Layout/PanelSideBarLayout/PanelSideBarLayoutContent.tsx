import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  isIconShownOnSidebarCollapse: boolean;
  excludeSibebarMenu: boolean;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, isIconShownOnSidebarCollapse, excludeSibebarMenu } = props;
  const { mainContentBodyRef } = usePanelSideBarContext();

  return (
    <section
      ref={mainContentBodyRef}
      id="main-content-body"
      className={classNames("content", { "show-icons": isIconShownOnSidebarCollapse }, { "exclude-sidebar-menu": excludeSibebarMenu })}
    >
      <main className="container-fluid">{children}</main>
      <footer hidden={!footer} className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{footer}</div>
        </div>
      </footer>
    </section>
  );
};
