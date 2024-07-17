import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";

export const PanelSideBar = <TPanelItemId extends string, TPanelItem>() => {
  const { activePanelId, menuItems, setActivePanel, renderFirstItemsLevelAsTiles, renderTilesAsLinks, LinkRenderer, theme } =
    usePanelSideBarContext<TPanelItemId, TPanelItem>();

  const className = classNames(
    "panel-layout",
    { "sidenav-dark": theme == "dark" },
    { "sidenav-light": theme == "light" },
    { "sidenav-blue": theme == "blue" },
  );

  const activePanel: PanelItem<TPanelItemId, TPanelItem> | undefined = menuItems.find((x) => x.id === activePanelId);

  if (renderFirstItemsLevelAsTiles) {
    if (menuItems.find((x) => !x.icon)) {
      throw new Error("Outer panel icon is required");
    }

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

    const PanelItemsRenderer = (props: { items: PanelItem<TPanelItemId, TPanelItem>[] }) => {
      const { items } = props;
      return items
        ?.filter((x) => x.display)
        .map((item, index) =>
          renderTilesAsLinks ? (
            <LinkRenderer key={index} item={item}>
              <ButtonIcon item={item} />
            </LinkRenderer>
          ) : (
            <ButtonIcon key={index} item={item} />
          ),
        );
    };

    return (
      <nav id="side-nav" className={className}>
        <div className="side-nav__tiles">{<PanelItemsRenderer items={menuItems} />}</div>
        <div className="side-nav__items">
          {activePanel?.children?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem> key={item.id} children={item} />
          ))}
        </div>
      </nav>
    );
  } else {
    return (
      <nav id="side-nav" className={className}>
        <div className="side-nav__items">
          {menuItems?.map((item) => (
            <PanelSideBarItem<TPanelItemId, TPanelItem> key={item.id} children={item} />
          ))}
        </div>
      </nav>
    );
  }
};
