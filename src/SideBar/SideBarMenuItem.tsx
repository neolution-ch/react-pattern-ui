import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISideBarMenuItem } from "./ISideBarMenuItem";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NavItem, Collapse } from "reactstrap";
import { useSideBarMenuContext } from "./SideBarMenuContext";

interface SideBarMenuItemProps {
  item: ISideBarMenuItem;
  depth?: number;
}

const SideBarMenuItem = ({ item, depth = 0 }: SideBarMenuItemProps) => {
  const { dispatch } = useSideBarMenuContext();

  const hasChildren = (item.children?.length || 0) > 0;
  const isOpen = item?.expanded;

  const toggleItem = () => dispatch({ type: "ToggleItem", title: item.title });

  console.log(item.title, hasChildren);

  return (
    <>
      <div>
        <NavItem onClick={toggleItem} className={classNames({ "menu-open": isOpen })} style={{ paddingLeft: `${0.5 * depth}rem` }}>
          {hasChildren || !item.routeName ? (
            <>
              <a role="button" className={classNames("nav-link", { "dropdown-toggle": hasChildren })}>
                {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                {item.title}
              </a>
            </>
          ) : (
            <>
              {/* <LegacyLink route={item.routeName} params={{ ...item.routeParams }}> */}
              <a className="nav-link" href="asd">
                {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                {item.title}
              </a>
              {/* </LegacyLink> */}
            </>
          )}
        </NavItem>
        {hasChildren && (
          <Collapse isOpen={isOpen} navbar className={classNames("items-menu", { "mb-1": isOpen })}>
            {item.children?.map((item, index) => (
              <SideBarMenuItem key={index} item={item} depth={depth + 1}></SideBarMenuItem>
            ))}
          </Collapse>
        )}
      </div>
    </>
  );
};

export { SideBarMenuItem };
