import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AppParameters, AppRoutes } from "src/routing/routeNames";

export interface ISideBarMenuItem {
  title: string;
  icon?: IconProp;
  routeName?: AppRoutes;
  routeParams?: AppParameters;
  children?: ISideBarMenuItem[];
  /**
   * Whether the item is expanded.
   */
  expanded?: boolean;
  /**
   * Whether the item should be displayed.
   */
  display?: boolean;
}
