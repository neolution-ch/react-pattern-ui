import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";

export const PanelSideBar = () => {
  const {
    activePanelId,
    globalItems,
    localItems = [],
    LinkRenderer,
    setActivePanel,
    toggledMenuItemIds,
    toggleMenuItem,
    renderFirstItemsLevelAsTiles,
    renderTilesAsLinks = true,
  } = usePanelSideBarContext();
  const panelItems = localItems.concat(globalItems);

  if (renderFirstItemsLevelAsTiles) {
    if (globalItems.find((x) => !x.icon) || localItems.find((x) => !x.icon)) {
      throw new Error("Outer panel icon is required");
    }

    const activePanel: PanelItem | undefined = panelItems.find((x) => x.id === activePanelId);
    const ButtonIcon = (props: { item: PanelItem }) => {
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

    const panelItemsRenderer = (items: PanelItem[]) =>
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
        <div className="side-nav__tiles">
          {panelItemsRenderer(globalItems)}
          {panelItemsRenderer(localItems)}
        </div>

        <div className="side-nav__items">
          {activePanel?.children?.map((item) => (
            <PanelSideBarItem
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
  } else {
    return (
      <nav id="side-nav" className="panel-layout">
        <div className="side-nav__items">
          {panelItems?.map((item) => (
            <PanelSideBarItem
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
