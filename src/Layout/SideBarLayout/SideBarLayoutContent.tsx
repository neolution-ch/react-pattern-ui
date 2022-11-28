import { FC, PropsWithChildren, ReactNode } from "react";

interface SideBarLayoutContentProps {
  footer?: ReactNode;
}

const SideBarLayoutContent: FC<PropsWithChildren<SideBarLayoutContentProps>> = ({ children, footer }) => (
  <article id="layout-sidenav__content">
    <main>
      <div className="m-2">{children}</div>
    </main>
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="layout-sidenav__footer align-items-center justify-content-between small">{footer}</div>
      </div>
    </footer>
  </article>
);

export { SideBarLayoutContent };
