import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  scroolToTopOnActivePanelChange?: boolean;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, scroolToTopOnActivePanelChange = false } = props;

  const { activePanelId } = usePanelSideBarContext();
  const mainSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scroolToTopOnActivePanelChange) {
      mainSectionRef.current?.scrollTo(0, 0);
    }
  }, [activePanelId]);

  return (
    <section ref={mainSectionRef} id="main-content-body" className="content">
      <main className="container-fluid">{children}</main>
      <footer hidden={!footer} className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{footer}</div>
        </div>
      </footer>
    </section>
  );
};
