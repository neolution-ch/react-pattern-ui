import { MutableRefObject, PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { usePanelSideBarContext } from "./PanelSideBar/Context/PanelSideBarContext";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
  scroolToTopOnActivePanelChange?: boolean;
  bodyRef?: MutableRefObject<HTMLElement | null>;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer, scroolToTopOnActivePanelChange = false, bodyRef } = props;

  const { activePanelId } = usePanelSideBarContext();
  const mainSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log(mainSectionRef.current);
    console.log("trying scrolling")
    if (scroolToTopOnActivePanelChange) {
      setTimeout(() => mainSectionRef.current?.scrollTo(0, 0), 100);
    }
  }, [activePanelId]);

  return (
    <section ref={bodyRef} id="main-content-body" className="content">
      <main className="container-fluid">{children}</main>
      <footer hidden={!footer} className="py-4 bg-light mt-auto">
        <div className="mx-4">
          <div className="layout-sidenav__footer">{footer}</div>
        </div>
      </footer>
    </section>
  );
};
