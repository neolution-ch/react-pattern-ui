import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";

interface PanelSidebarProps {
  toggledSidebar: boolean;
}

export const PanelSideBar = (props: PanelSidebarProps) => {
  const { toggledSidebar } = props;
  const {
    activePanelId,
    globalItems,
    localItems = [],
    LinkRenderer,
    setActivePanel,
    toggledMenuItemIds,
    toggleMenuItem,
  } = usePanelSideBarContext();
  const panelItems = localItems.concat(globalItems);

  if (globalItems.find((x) => !x.icon) || localItems.find((x) => !x.icon)) {
    throw new Error("Outer panel icon is required");
  }

  const activePanel: PanelItem | undefined = panelItems.find((x) => x.id === activePanelId);

  const panelItemsRenderer = (items: PanelItem[]) =>
    items?.map(({ disabled, icon, onClick, id, title }) => (
      <Button
        key={id}
        color="primary"
        outline
        className={classNames("tile", { active: activePanelId === id })}
        onClick={() => {
          if (onClick) {
            onClick();
          } else {
            setActivePanel(id);
          }
        }}
        title={typeof title == "string" ? String(title) : ""}
        disabled={disabled}
      >
        {icon && <FontAwesomeIcon icon={icon} size="lg" fixedWidth />}
      </Button>
    ));

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
            toggledSidebar={toggledSidebar}
          />
        ))}
      </div>
    </nav>
  );
};
