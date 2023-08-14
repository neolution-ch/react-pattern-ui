import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

interface SideBarLayoutProviderProps {
  theme: "dark" | "light";
  footer?: ReactNode;
  brand?: ReactNode;
  userDropDownMenuToggle?: ReactNode;
  userDropDownMenu?: ReactNode;
}

const SideBarLayoutContext = createContext<SideBarLayoutProviderProps | null>(null);

const SideBarLayoutProvider = (props: PropsWithChildren<SideBarLayoutProviderProps>) => {
  const { brand = null, children, footer = null, theme, userDropDownMenu, userDropDownMenuToggle } = props;
  return (
    <SideBarLayoutContext.Provider value={{ brand, footer, theme, userDropDownMenu, userDropDownMenuToggle }}>
      {children}
    </SideBarLayoutContext.Provider>
  );
};

const useSideBarLayoutContext = () => {
  const context = useContext(SideBarLayoutContext);
  if (context === null) {
    throw new Error("useSideBarLayoutContext must be used within a SideBarLayoutProvider");
  }
  return context;
};

export { SideBarLayoutProvider, useSideBarLayoutContext, SideBarLayoutProviderProps };
