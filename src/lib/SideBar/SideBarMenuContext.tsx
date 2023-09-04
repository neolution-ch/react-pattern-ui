import React, { ComponentType, createContext, ReactNode, useContext, useState } from "react";
import { ISideBarMenuItem } from "./ISideBarMenuItem";

interface LinkRendererProps {
  item: ISideBarMenuItem;
  children: ReactNode;
}

interface SideBarMenuContextProps {
  items: ISideBarMenuItem[];
  LinkRenderer: ComponentType<LinkRendererProps>;
  toggleItem: (id: string) => void;
  expandedMenuItemIds: string[];
}

const SideBarMenuContext = createContext<SideBarMenuContextProps | null>(null);

interface SideBarMenuProviderProps extends Pick<SideBarMenuContextProps, "items" | "LinkRenderer"> {
  children: React.ReactNode;
}

const SideBarMenuProvider = (props: SideBarMenuProviderProps) => {
  const { children, items, LinkRenderer } = props;

  const preExpandedMenuItemIds = items.filter((x) => x.expanded).map((x) => x.id);
  const [expandedMenuItemIds, setExpandedMenuItemIds] = useState<string[]>(preExpandedMenuItemIds);

  const toggleItem = (id: string) => {
    // either add or remove the toggled id from the list of open menus
    setExpandedMenuItemIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <SideBarMenuContext.Provider value={{ items: items, LinkRenderer, toggleItem, expandedMenuItemIds }}>
      {children}
    </SideBarMenuContext.Provider>
  );
};

const useSideBarMenuContext = () => {
  const context = useContext(SideBarMenuContext);
  if (context === null) {
    throw new Error("useSideBarMenuContext must be used within a SideBarMenuProvider");
  }
  return context;
};
export { SideBarMenuProvider, useSideBarMenuContext, LinkRendererProps };
