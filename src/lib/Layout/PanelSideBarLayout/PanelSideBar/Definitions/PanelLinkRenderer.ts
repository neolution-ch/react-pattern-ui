import { ComponentType, ReactNode } from "react";
import { PanelItem } from "./PanelItem";

export interface PanelLinkRendererProps<TPanelItemId extends string, TPanelItem> {
  /**
   * The generic panel item.
   */
  item: PanelItem<TPanelItemId, TPanelItem>;
  /**
   * The panel children item.
   */
  children: ReactNode;
}

export type PanelLinkRenderer<TPanelItemId extends string, TPanelItem> = ComponentType<PanelLinkRendererProps<TPanelItemId, TPanelItem>>;
