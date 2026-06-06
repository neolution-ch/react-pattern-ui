import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  isIconShownOnSidebarCollapse: boolean;
  excludeSibebarMenu: boolean;
  mainContentBodyRef?: React.RefObject<HTMLElement | null>;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, isIconShownOnSidebarCollapse, excludeSibebarMenu, mainContentBodyRef } = props;

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
