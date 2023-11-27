import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import { PanelItem } from "./Definitions/PanelItem";
import { PanelSideBarItem } from "./PanelSideBarItem";
import { LoadingSkeleton } from "src/Skeleton/LoadingSkeleton";
import { useQuery } from "react-query";

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

  const LazySkeleton = (props: { queryKey: string, query: Promise<PanelItem<unknown>> }) => {
    const {queryKey, query} = props;
    const { data, isLoading, isSuccess } = useQuery(queryKey, () => query,  { refetchOnWindowFocus: false, refetchOnReconnect: false });
    return (
      <LoadingSkeleton isLoading={isLoading} isSuccess={isLoading || isSuccess}>
        {data && (
          <PanelSideBarItem
            key={data.id}
            children={data}
            LinkRenderer={LinkRenderer}
            onClick={(menuItem) => toggleMenuItem(menuItem)}
            toggledItemIds={toggledMenuItemIds}
            toggledSidebar={toggledSidebar}
          />
        )}
      </LoadingSkeleton>
    );
  };
  return (
    <nav id="side-nav" className="panel-layout">
      <div className="side-nav__tiles">
        {panelItemsRenderer(globalItems)}
        {panelItemsRenderer(localItems)}
      </div>

      <div className="side-nav__items">
        {activePanel?.children?.map((item, index) => (
          item instanceof Promise ?
            <LazySkeleton queryKey={`${activePanel.id}_${index}`} query={item} />
            :
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
