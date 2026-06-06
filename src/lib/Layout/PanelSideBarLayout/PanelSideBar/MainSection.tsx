import classNames from "classnames";
import { PropsWithChildren } from "react";

interface MainSectionProps extends PropsWithChildren {
  isSidebarOpen: boolean;
  useResponsiveLayout?: boolean;
  renderFirstItemsLevelAsTiles?: boolean;
}

const MainSection = (props: MainSectionProps) => {
  const { children, isSidebarOpen, useResponsiveLayout = false, renderFirstItemsLevelAsTiles } = props;
  return (
    <section
      id="main-section"
      className={classNames(
        { toggled: !isSidebarOpen },
        { "responsive-layout": useResponsiveLayout },
        { "section-no-tiles": !renderFirstItemsLevelAsTiles },
        { "section-tiles": renderFirstItemsLevelAsTiles },
      )}
    >
      {children}
    </section>
  );
};

export { MainSection };
