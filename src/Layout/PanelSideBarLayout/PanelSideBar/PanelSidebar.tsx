import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelSideBarMenuItem";
import { PanelSideBarItem } from "./PanelSideBarItem";

interface PanelSideBarProps {
  localItems?: PanelItem[];
}

export const PanelSideBar = (props: PanelSideBarProps) => {
  const { localItems = [] } = props;

  const { activePanelId, globalItems, LinkRenderer, setActivePanel, toggledMenuItemIds, toggleMenuItem } = usePanelSideBarContext();

  const activePanel: PanelItem = globalItems.find((x) => x.id === activePanelId);
  const localActivePanel: PanelItem | undefined = localItems?.find((x) => x.id === activePanelId);

  const panelItemsRenderer = (items: PanelItem[]) =>
    items?.map(({ disabled, icon, id, title }) => (
      <Button
        key={id}
        color="primary"
        outline
        className={classNames("tile", { active: activePanelId === id })}
        onClick={() => setActivePanel(id)}
        title={title}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={icon} size="lg" fixedWidth />
      </Button>
    ));

  return (
    <nav id="side-nav" className="panel-layout">
      <div className="side-nav__tiles">
        {panelItemsRenderer(globalItems)}
        {panelItemsRenderer(localItems)}
      </div>

      <div className="side-nav__items">
        {activePanel?.items?.map((item) => (
          <PanelSideBarItem
            key={item.id}
            item={item}
            LinkRenderer={LinkRenderer}
            onClick={(menuItem) => toggleMenuItem(menuItem)}
            toggledItemIds={toggledMenuItemIds}
          />
        ))}

        {localActivePanel?.items?.map((item) => (
          <PanelSideBarItem key={item.id} item={item} LinkRenderer={LinkRenderer} toggledItemIds={toggledMenuItemIds} />
        ))}
      </div>
    </nav>
  );
};
