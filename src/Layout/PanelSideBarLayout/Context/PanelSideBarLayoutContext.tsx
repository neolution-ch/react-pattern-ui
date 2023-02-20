import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export interface PanelSideBarLayoutProviderProps {
  footer?: ReactNode;
  brand?: ReactNode;
  userDropDownMenuToggle?: ReactNode;
  userDropDownMenu?: ReactNode;
}

const PanelSideBarLayoutContext = createContext<PanelSideBarLayoutProviderProps | null>(null);

export const PanelSideBarLayoutProvider = (props: PropsWithChildren<PanelSideBarLayoutProviderProps>) => {
  const { brand = null, children, footer = null, userDropDownMenu, userDropDownMenuToggle } = props;

  return (
    <PanelSideBarLayoutContext.Provider value={{ brand, footer, userDropDownMenu, userDropDownMenuToggle }}>
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
