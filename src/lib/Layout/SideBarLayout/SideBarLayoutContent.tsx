import { FC, PropsWithChildren, ReactNode } from "react";
import {usePanelSideBarContext} from "src/lib/Layout/PanelSideBarLayout/PanelSideBar/Context/PanelSideBarContext";

interface SideBarLayoutContentProps {
  footer?: ReactNode;
}

const SideBarLayoutContent: FC<PropsWithChildren<SideBarLayoutContentProps>> = ({ children, footer }) => {
  const { footer: contextFooter } = usePanelSideBarContext();

  return (
    <article id="layout-sidenav__content">
      <main className="container-fluid p-4">{children}</main>
      <footer className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{contextFooter ?? footer}</div>
        </div>
      </footer>
    </article>
  );
};

export { SideBarLayoutContent };
