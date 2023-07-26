import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export type PanelItem<TPanelItem = Record<string, unknown>, TMenuItem = Record<string, unknown>> = TPanelItem & {
  /**
   * The panel icon.
   */
  icon: IconProp;
  /**
   * The panel item identifier.
   */
  id: string;

  /**
   * The custom onClick that prevents all others default action.
   */
  onClick?(): void;

  /**
   * The panel menu items.
   */
  items: PanelMenuItem<TMenuItem>[];
  /**
   * Whether the panel is disabled.
   */
  disabled?: boolean;
  /**
   * The panel title.
   */
  title?: string;
};

export type PanelMenuItem<T = Record<string, unknown>> = T & {
  /**
   * The menu item identifier.
   */
  id: string;
  /**
   * The menu item title.
   */
  title: ReactNode;
  /**
   * Whether the item is active.
   */
  active?: boolean;
  /**
   * The menu item children items.
   */
  children?: Omit<PanelMenuItem<T>, "children">[];
  /**
   * Whether the item should be displayed.
   */
  display?: boolean;
  /**
   * Whether the item is expanded.
   */
  expanded?: boolean;
  /**
   * The menu item icon.
   */
  icon?: IconProp;
};
