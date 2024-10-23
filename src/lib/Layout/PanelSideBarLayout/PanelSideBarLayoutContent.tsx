import classNames from "classnames";
import { MutableRefObject, PropsWithChildren, ReactNode } from "react";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  mainContentBodyRef?: MutableRefObject<HTMLElement | null>;
  isIconShownOnSidebarCollapse: boolean;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, mainContentBodyRef, isIconShownOnSidebarCollapse } = props;

  return (
    <section
      ref={mainContentBodyRef}
      id="main-content-body"
      className={classNames("content", { "show-icons": isIconShownOnSidebarCollapse })}
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
