import React, { createContext, useContext, useReducer } from "react";
import { ISideBarMenuItem } from "./ISideBarMenuItem";

type Actions = { type: "ToggleItem"; title: string };

interface SideBarMenuContextState {
  items: ISideBarMenuItem[];
}

const updateItem = (item: ISideBarMenuItem, title: string): ISideBarMenuItem | null => {
  if (item == null) return null;

  if (item.title === title) {
    item.expanded = !item.expanded;
    return item;
  }

  (item.children as any) = item.children?.map((childItem) => updateItem(childItem, title));

  return item;
};

const sideBarMenuContextReducer = (prevState: SideBarMenuContextState, action: Actions): SideBarMenuContextState => {
  const { type } = action;

  switch (type) {
    case "ToggleItem": {
      const { title } = action;

      const updatedItems = prevState.items.map((item) => updateItem(item, title));

      return { ...prevState, items: updatedItems as ISideBarMenuItem[] };
    }
    default:
      throw new Error(`Unhandled action: [${type}]`);
  }
};

interface SiderBarMenuContextReducer {
  state: SideBarMenuContextState | undefined;
  dispatch: (action: Actions) => void | undefined;
}

type ISidebarMenuContext = SiderBarMenuContextReducer;

const SideBarMenuContext = createContext<ISidebarMenuContext | undefined>(undefined);

const useSideBarMenuContext = (): SiderBarMenuContextReducer => {
  const ctx = useContext(SideBarMenuContext);

  if (ctx === undefined) throw new Error("SidebarMenuProvider not found.");

  return ctx;
};

interface SideBarMenuProviderProps {
  children: React.ReactNode;
  items: ISideBarMenuItem[];
}

const SideBarMenuProvider = (props: SideBarMenuProviderProps) => {
  const { children, items } = props;
  const initialValues: SideBarMenuContextState = {
    items: items ?? [],
  };

  const [state, dispatch] = useReducer(sideBarMenuContextReducer, initialValues);

  return <SideBarMenuContext.Provider value={{ dispatch, state }}>{children}</SideBarMenuContext.Provider>;
};

export { SideBarMenuProvider, useSideBarMenuContext };
