// @ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ComponentType, useState, useMemo} from "react";
import { Collapse, NavItem } from "reactstrap";
import { LinkRendererProps } from "src/lib/SideBar/SideBarMenuContext";
import { PanelItem } from "./../PanelSideBar/Definitions/PanelItem";
import { LoadingSkeleton } from "src/Skeleton/LoadingSkeleton";
import { useQuery } from "react-query";
import { ISideBarMenuItem } from "src/lib/SideBar/ISideBarMenuItem";

export interface PanelSideBarItemProps {
  children: PanelItem<unknown>;
  LinkRenderer: ComponentType<LinkRendererProps>;
  onClick?: (menuItem: PanelItem<unknown>) => void;
  depth?: number;
  active?: boolean;
  toggledItemIds: string[];
  toggledSidebar: boolean;
}

// eslint-disable-next-line complexity
const PanelSideBarItem = (props: PanelSideBarItemProps) => {
  const { depth = 0, children: item, LinkRenderer, onClick, toggledItemIds = [], toggledSidebar } = props;

  // Temporary to avoid double  render
  const item2 = useMemo(() => item, []);
  
  if (item2.display === false) {
    return null;
  }
  if (item.display === false) {
    return null;
  }
  const hasitem = !!item.children?.length;
  const [isOpen, setIsOpen] = useState(toggledItemIds?.includes(item.id) || item.expanded);

  const LazySkeleton = (props: { queryKey: string, query: Promise<PanelItem<unknown>> }) => {
    const { query, queryKey } = props;
    const { data, isLoading, isSuccess } = useQuery(queryKey, () => query, { refetchOnWindowFocus: false, refetchOnReconnect: false});
   
    return (
      <LoadingSkeleton isLoading={isLoading} isSuccess={isLoading || isSuccess}>
        {data && (
          <PanelSideBarItem
            key={data.id}
            children={data}
            LinkRenderer={LinkRenderer}
            onClick={() => onClick && onClick(data)}
            depth={depth + 1}
            active={item.active}
            toggledItemIds={toggledItemIds}
            toggledSidebar={toggledSidebar}
          />
        )}
      </LoadingSkeleton>
    );
  };

  console.log(hasitem);
  return (
    <>
      <NavItem
        onClick={() => onClick && onClick(item)}
        className={classNames({
          "menu-open": isOpen,
          active: item.children?.filter((x) => !(x instanceof Promise)).find((s: PanelItem<unknown>) => s.active) || item.active,
        })}
        style={{ paddingLeft: depth ? `${depth + 1}rem` : undefined }}
      >
        {hasitem ? (
          <div className="d-flex flex-row">
            {item.collapseIconOnly && (
              <LinkRenderer item={item as ISideBarMenuItem}>
                <span className="nav-link">
                  {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                  {item.title}
                </span>
              </LinkRenderer>
            )}

            <a
              role="button"
              className={classNames("nav-link", { "w-100": !item.collapseIconOnly }, { "dropdown-toggle": hasitem })}
              onClick={() => setIsOpen(prev => !prev)}
            >
              {!item.collapseIconOnly && (
                <span>
                  {item.icon && <FontAwesomeIcon className="me-2" icon={item.icon} />}
                  {item.title}
                </span>
              )}
            </a>
          </div>
        ) : (
          <>
            <LinkRenderer item={item as ISideBarMenuItem}>
              <span className="nav-link">
                {item.icon && <FontAwesomeIcon icon={item.icon} className="me-2" />}
                {item.title}
              </span>
            </LinkRenderer>
          </>
        )}
      </NavItem>

      {hasitem && (
        <Collapse isOpen={isOpen} navbar className={classNames("item-menu", { "mb-1": isOpen })}>
          {item.children?.map((childItem, index) =>
            childItem instanceof Promise ? (
              <LazySkeleton queryKey={`${item.id}_${index}`} query={childItem} />
            ) : (
              <PanelSideBarItem
                key={childItem.id}
                children={childItem}
                LinkRenderer={LinkRenderer}
                onClick={() => onClick && onClick(childItem)}
                depth={depth + 1}
                active={item.active}
                toggledItemIds={toggledItemIds}
                toggledSidebar={toggledSidebar}
              />
            ),
          )}
        </Collapse>
      )}
    </>
  );
};

export { PanelSideBarItem };
