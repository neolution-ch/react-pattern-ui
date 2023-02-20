import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type PanelItem<TPanelItem = Record<string, unknown>, TMenuItem = Record<string, unknown>> = TPanelItem & {
  id: string;
  items: PanelMenuItem<TMenuItem>[];
  disabled?: boolean;
  icon: IconProp;
  title?: string;
};

export type PanelMenuItem<T = Record<string, unknown>> = T & {
  id: string;
  title: string;
  icon?: IconProp;
  /**
   * Whether the item is expanded.
   */
  expanded?: boolean;
  /**
   * Whether the item should be displayed.
   */
  display?: boolean;
  children?: Omit<PanelMenuItem<T>, "children">[];
};
