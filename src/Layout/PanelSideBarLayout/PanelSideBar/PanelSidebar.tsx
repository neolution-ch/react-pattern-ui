import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelSideBarMenuItem";
import { PanelSideBarItem } from "./PanelSideBarItem";
import { useState } from "react";
interface PanelSideBarProps {
  localItems?: PanelItem[];
}

export const PanelSideBar = (props: PanelSideBarProps) => {
  const { localItems = [] } = props;

  let localMenuId: string | null = null;

  if (localItems?.length > 0) {
    const [firstLocalItem] = localItems;
    localMenuId = firstLocalItem.id;
  }

  const [localItemId, setLocalItemId] = useState<string | null>(localMenuId);

  const { activePanelId, globalItems, LinkRenderer, setActivePanel, toggledMenuItemIds, toggleMenuItem } = usePanelSideBarContext();

  const localActivePanelId = localItemId ?? activePanelId;
  const activePanel: PanelItem = globalItems.find((x) => x.id === localActivePanelId);
  const localActivePanel: PanelItem | undefined = localItems?.find((x) => x.id === localActivePanelId);

  const panelItemsRenderer = (items: PanelItem[]) =>
    items?.map(({ disabled, icon, onClick, id, title }) => (  
        <Button
        key={id}
        color="primary"
        outline
        className={classNames("tile", { active: localActivePanelId === id })}
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            setLocalItemId(null);
            setActivePanel(id);
          }

        }}
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
