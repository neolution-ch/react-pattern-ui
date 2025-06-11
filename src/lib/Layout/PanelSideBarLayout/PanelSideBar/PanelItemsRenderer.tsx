import { PanelItem } from "./Definitions/PanelItem";
import { ButtonIcon } from "./ButtonIcon";
import { PanelLinkRenderer } from "./Definitions/PanelLinkRenderer";

interface PanelItemsRendererProps<TPanelItemId extends string, TPanelItem> {
  items: PanelItem<TPanelItemId, TPanelItem>[];
  activePanelId?: TPanelItemId;
  renderTilesAsLinks?: boolean;
  setActivePanel: (panelId: TPanelItemId) => void;
  LinkRenderer: PanelLinkRenderer<TPanelItemId, TPanelItem>;
  hiddenMenuItemIds: TPanelItemId[];
}
export const PanelItemsRenderer = <TPanelItemId extends string, TPanelItem>(props: PanelItemsRendererProps<TPanelItemId, TPanelItem>) => {
  const { items, activePanelId, renderTilesAsLinks, setActivePanel, LinkRenderer, hiddenMenuItemIds } = props;
  return items

    ?.filter((x) => !hiddenMenuItemIds.includes(x.id))
    .map((item, index) =>
      renderTilesAsLinks ? (
        <LinkRenderer key={index} item={item}>
          <ButtonIcon item={item} setActivePanel={setActivePanel} activePanelId={activePanelId} renderTilesAsLinks={renderTilesAsLinks} />
        </LinkRenderer>
      ) : (
        <ButtonIcon
          key={index}
          item={item}
          setActivePanel={setActivePanel}
          activePanelId={activePanelId}
          renderTilesAsLinks={renderTilesAsLinks}
        />
      ),
    );
};
