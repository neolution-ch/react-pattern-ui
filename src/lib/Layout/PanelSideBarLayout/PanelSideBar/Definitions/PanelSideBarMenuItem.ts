import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {ReactNode} from "react";

export type PanelItem<TPanelItem = Record<string, unknown>, TMenuItem = Record<string, unknown>> = TPanelItem & {
  /**
   * The panel icon.
   */
  icon?: IconProp;
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
  children?: PanelItem<TMenuItem>[];
  /**
   * Whether the panel is disabled.
   */
  disabled?: boolean;
  /**
   * The panel title.
   */
  title: ReactNode;
  /**
   * Whether the item should be displayed.
   */
  display?: boolean;
  /**
   * Whether the item is expanded.
   */
  expanded?: boolean;
  /**
   * Whether the item is active.
   */
  active?: boolean;
};
