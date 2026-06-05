import "../../../../styles/Layout/index.scss";

import { ComponentProps, PropsWithChildren } from "react";
import { PanelSideBarLayoutContent } from "./PanelSideBarLayoutContent";
import { PanelSidebarNavbarInternal, PanelSidebarNavbarInternalProps } from "./PanelSideBarNavbar";
import { MainSection } from "./PanelSideBar/MainSection";
import { PanelSideBarLayoutProps } from "./PanelSideBarLayout";

export interface NavbarLayoutProps
  extends
    PropsWithChildren,
    Pick<ComponentProps<typeof PanelSideBarLayoutContent>, "footer" | "mainContentBodyRef">,
    Pick<PanelSideBarLayoutProps, "useResponsiveLayout" | "navbarLeftItems" | "navbarRightItems" | "brand">,
    Pick<PanelSidebarNavbarInternalProps, "theme"> {}

export const NavbarLayout = (props: NavbarLayoutProps) => {
  const { brand, children, navbarLeftItems, navbarRightItems, footer, useResponsiveLayout = false, mainContentBodyRef, theme } = props;

  return (
    <>
      <PanelSidebarNavbarInternal
        useToggleButton={false}
        theme={theme}
        brand={brand}
        navbarRightItems={navbarRightItems}
        navbarLeftItems={navbarLeftItems}
      />
      <MainSection isSidebarOpen={false} useResponsiveLayout={useResponsiveLayout}>
        <PanelSideBarLayoutContent
          excludeSibebarMenu={true}
          footer={footer}
          isIconShownOnSidebarCollapse={false}
          mainContentBodyRef={mainContentBodyRef}
        >
          {children}
        </PanelSideBarLayoutContent>
      </MainSection>
    </>
  );
};
