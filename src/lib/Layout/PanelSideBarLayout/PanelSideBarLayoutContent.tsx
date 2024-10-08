import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";

interface PanelSideBarLayoutContentProps extends PropsWithChildren {
  footer?: ReactNode;
}

export const PanelSideBarLayoutContent = (props: PanelSideBarLayoutContentProps) => {
  const { children, footer } = props;

  const mainSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log("trying scrolling main content body");
    mainSectionRef.current?.scrollTo(0, 0);
  }, []);

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
