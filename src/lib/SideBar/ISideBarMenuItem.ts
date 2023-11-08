import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export interface ISideBarMenuItem {
  id: string;
  title: ReactNode;
  icon?: IconProp;
  children?: ISideBarMenuItem[];

  /**
   * Whether the item is expanded.
   */
  expanded?: boolean;

  /**
   * Whether the item should be displayed.
   */
  display?: boolean;

  /**
   * classes that can be added by the user
   */
  className?: string;

  /**
   * adds the active class to the element
   */
  isActive?: boolean;
}
