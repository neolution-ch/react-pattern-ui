import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

interface SideBarLayoutProviderProps {
  footer?: ReactNode;
  brand?: ReactNode;
}

const SideBarLayoutContext = createContext<SideBarLayoutProviderProps | null>(null); // TODO Merge with menu provider (?)

export const SideBarLayoutProvider = (props: PropsWithChildren<SideBarLayoutProviderProps>) => {
  const { brand = null, children, footer = null } = props;

  return <SideBarLayoutContext.Provider value={{ brand, footer }}>{children}</SideBarLayoutContext.Provider>;
};

export const useSideBarLayoutContext = () => {
  const context = useContext(SideBarLayoutContext);
  if (context === null) {
    throw new Error("useSideBarLayoutContext must be used within a SideBarLayoutProvider");
  }
  return context;
};
