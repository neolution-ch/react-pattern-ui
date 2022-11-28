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
}

const SideBarMenuContext = createContext<SideBarMenuContextProps | null>(null);

interface SideBarMenuProviderProps extends Pick<SideBarMenuContextProps, "items" | "LinkRenderer"> {
  children: React.ReactNode;
}

const SideBarMenuProvider = (props: SideBarMenuProviderProps) => {
  const { items, children, LinkRenderer } = props;

  const [itemState, setItemState] = useState(items);

  const toggleItemInternal = (item: ISideBarMenuItem, id: string) => {
    if (item.id === id) {
      item.expanded = !item.expanded;
    }

    if (item.children) {
      item.children = item.children.map((child) => toggleItemInternal(child, id));
    }

    return item;
  };

  const toggleItem = (id: string) => {
    setItemState((prev) => prev.map((item) => toggleItemInternal(item, id)));
  };

  return <SideBarMenuContext.Provider value={{ items: itemState, LinkRenderer, toggleItem }}>{children}</SideBarMenuContext.Provider>;
};

const useSideBarMenuContext = () => {
  const context = useContext(SideBarMenuContext);
  if (context === null) {
    throw new Error("useSideBarMenuContext must be used within a SideBarMenuProvider");
  }
  return context;
};

export { SideBarMenuProvider, useSideBarMenuContext, LinkRendererProps };
