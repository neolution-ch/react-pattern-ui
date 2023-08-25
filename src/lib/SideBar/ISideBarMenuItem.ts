import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ISideBarMenuItem {
  id: string;
  title: string;
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
   * more classes that can be added by the user
   */
  additionalClasses?: string[];  
}
