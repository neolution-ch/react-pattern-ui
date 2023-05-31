import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export interface PanelSideBarLayoutProviderProps {
  /**
   * The footer content.
   */
  footer?: ReactNode;
  /**
   * The brand content shown on the top navigation bar.
   */
  brand?: ReactNode;
  /**
   * The user dropdown toggle content.
   */
  userDropDownMenuToggle?: ReactNode;
  /**
   * The user dropdown menu content.
   */
  userDropDownMenu?: ReactNode;
  /**
   * The other menu content.
   */
  topBarCustomItems?: JSX.Element[];
}

const PanelSideBarLayoutContext = createContext<PanelSideBarLayoutProviderProps | null>(null);

export const PanelSideBarLayoutProvider = (props: PropsWithChildren<PanelSideBarLayoutProviderProps>) => {
  const { brand = null, children, footer = null, userDropDownMenu, userDropDownMenuToggle, topBarCustomItems } = props;

  return (
    <PanelSideBarLayoutContext.Provider value={{ brand, footer, userDropDownMenu, userDropDownMenuToggle, topBarCustomItems }}>
      {children}
    </PanelSideBarLayoutContext.Provider>
  );
};

export const usePanelSideBarLayoutContext = () => {
  const context = useContext(PanelSideBarLayoutContext);
  if (context === null) {
    throw new Error("usePanelSideBarLayoutContext must be used within a PanelSideBarLayoutProvider");
  }
  return context;
};
