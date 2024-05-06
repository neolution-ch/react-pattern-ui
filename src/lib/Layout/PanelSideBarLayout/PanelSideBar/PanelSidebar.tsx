import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";
import { PanelSideBarLayoutProps } from "../PanelSideBarLayout";

type PanelSideBarProps<TPanelItemId extends string, TPanelItem> = Pick<
  PanelSideBarLayoutProps<TPanelItemId, TPanelItem>,
  "renderFirstItemsLevelAsTiles" | "renderTilesAsLinks" | "LinkRenderer"
>;

export const PanelSideBar = <TPanelItemId extends string, TPanelItem>(props: PanelSideBarProps<TPanelItemId, TPanelItem>) => {
  const { renderFirstItemsLevelAsTiles, renderTilesAsLinks, LinkRenderer } = props;
  const { activePanelId, menuItems, setActivePanel, toggledMenuItemIds, toggleMenuItem } = usePanelSideBarContext<
    TPanelItemId,
    TPanelItem
  >();

  if (renderFirstItemsLevelAsTiles) {
    if (menuItems.find((x) => !x.icon)) {
      throw new Error("Outer panel icon is required");
    }

    const activePanel: PanelItem<TPanelItemId, TPanelItem> | undefined = menuItems.find((x) => x.id === activePanelId);
    const ButtonIcon = (props: { item: PanelItem<TPanelItemId, TPanelItem> }) => {
      const {
        item: { disabled, icon, onClick, id, title },
      } = props;
      return (
        <Button
          key={id}
          color="primary"
          outline
          className={classNames("tile", { active: activePanelId === id })}
          onClick={() => {
            if (!renderTilesAsLinks) {
              if (onClick) {
                onClick();
              } else {
                setActivePanel(id);
              }
            }
          }}
          title={typeof title == "string" ? String(title) : ""}
          disabled={disabled}
        >
          {icon && <FontAwesomeIcon icon={icon} size="lg" fixedWidth />}
        </Button>
      );
    };

    const panelItemsRenderer = (items: PanelItem<TPanelItemId, TPanelItem>[]) =>
      items?.map((item) =>
        renderTilesAsLinks ? (
          <LinkRenderer item={item}>
            <ButtonIcon item={item} />
          </LinkRenderer>
        ) : (
          <ButtonIcon item={item} />
        ),
      );

    return (
      <nav id="side-nav" className="panel-layout">
        <div className="side-nav__tiles">{panelItemsRenderer(menuItems)}</div>

        <div className="side-nav__items">
          {activePanel?.children?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem>
              key={item.id}
              children={item}
              LinkRenderer={LinkRenderer}
              onClick={(menuItemId) => toggleMenuItem(menuItemId)}
              toggledItemIds={toggledMenuItemIds}
            />
          ))}
        </div>
      </nav>
    );
  } else {
    return (
      <nav id="side-nav" className="panel-layout">
        <div className="side-nav__items">
          {menuItems?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem>
              key={item.id}
              children={item}
              LinkRenderer={LinkRenderer}
              onClick={(menuItem) => toggleMenuItem(menuItem)}
              toggledItemIds={toggledMenuItemIds}
            />
          ))}
        </div>
      </nav>
    );
  }
};
