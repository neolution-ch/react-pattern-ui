import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelSideBarMenuItem";
import { PanelSideBarItem } from "./PanelSideBarItem";

interface PanelSideBarProps {
  localItems?: PanelItem[];
}

export const PanelSideBar = (props: PanelSideBarProps) => {
  const { localItems = [] } = props;

  const { activePanelId, globalItems, LinkRenderer, setActivePanel, setLocalPanelItems, toggleMenuItem } = usePanelSideBarContext();

  const activePanel: PanelItem = globalItems.find((x) => x.id === activePanelId);

  useEffect(() => {
    setLocalPanelItems(localItems);
  }, [localItems]);

  const panelItemsRenderer = (items: PanelItem[]) =>
    items?.map(({ disabled, icon, id, title }) => (
      <Button
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
      <div className="side-nav__tiles">{panelItemsRenderer(globalItems)}</div>

      <div className="side-nav__items">
        {activePanel?.items?.map((item, i) => (
          <PanelSideBarItem key={i} item={item} LinkRenderer={LinkRenderer} onClick={(menuItem) => toggleMenuItem(activePanel, menuItem)} />
        ))}
      </div>
    </nav>
  );
};
