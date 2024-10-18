import classNames from "classnames";
import { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  mainContentBodyRef?: MutableRefObject<HTMLElement | null>;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, mainContentBodyRef } = props;
  const { isIconShownOnSidebarCollapse } = usePanelSideBarContext();

  return (
    <section ref={mainContentBodyRef} id="main-content-body" className={classNames("content", { "show-icons": isIconShownOnSidebarCollapse })}>
      <main className="container-fluid">{children}</main>
      <footer hidden={!footer} className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{footer}</div>
        </div>
      </footer>
    </section>
  );
};
