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

  const { globalItems, LinkRenderer, toggledMenuItemIds, toggleMenuItem } = usePanelSideBarContext();

  let initialActivePanel: string;
  if (localItems?.length > 0) {
    const [firstLocalItem] = localItems;
    initialActivePanel = firstLocalItem.id;
  } else {
    initialActivePanel = globalItems.find((x) => x.id)?.id ?? "";
  }

  const [activePanelId, setActivePanelId] = useState<string>(initialActivePanel);

  const activePanel: PanelItem = globalItems.find((x) => x.id === activePanelId);
  const localActivePanel: PanelItem | undefined = localItems?.find((x) => x.id === activePanelId);

  const panelItemsRenderer = (items: PanelItem[]) =>
    items?.map(({ disabled, icon, id, title }) => (
      <Button
        key={id}
        color="primary"
        outline
        className={classNames("tile", { active: activePanelId === id })}
        onClick={() => setActivePanelId(id)}
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
