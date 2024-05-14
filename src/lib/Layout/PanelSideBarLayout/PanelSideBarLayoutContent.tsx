import { PropsWithChildren, ReactNode } from "react";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer } = props;

  return (
    <section id="main-content-body" className="content">
      <main className="container-fluid">{children}</main>
      <footer hidden={!footer} className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{footer}</div>
        </div>
      </footer>
    </section>
  );
};
