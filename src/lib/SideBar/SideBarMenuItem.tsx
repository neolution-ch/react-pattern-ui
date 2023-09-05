import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISideBarMenuItem } from "./ISideBarMenuItem";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Collapse } from "reactstrap";
import { useSideBarMenuContext } from "./SideBarMenuContext";

interface SideBarMenuItemProps {
  item: ISideBarMenuItem;
  depth?: number;
}

const SideBarMenuItem = ({ item, depth = 0 }: SideBarMenuItemProps) => {
  const { toggleItem, LinkRenderer, expandedMenuItemIds } = useSideBarMenuContext();

  const hasChildren = (item.children?.length || 0) > 0;
  const isOpen = item.expanded ?? expandedMenuItemIds.includes(item.id);

  if (item.display === false) {
    return null;
  }

  return (
    <>
      <div className={classNames(item.className, { "menu-open": isOpen, active: item.isActive })}>
        <div onClick={() => toggleItem(item.id)} className={classNames({ "menu-open": isOpen }, `nesting-level-${depth}`, "nav-item")}>
          {hasChildren ? (
            <>
              <div className={classNames({ dropend: !isOpen })}>
                <a role="button" className={classNames("nav-link", { "dropdown-toggle": hasChildren })}>
                  <div className="d-flex">
                    {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                    <div className="text-justify">{item.title}</div>
                  </div>
                </a>
              </div>
            </>
          ) : (
            <>
              <LinkRenderer item={item}>
                <span className="nav-link">
                  {item.icon && <FontAwesomeIcon icon={item.icon as IconProp} className="me-2" />}
                  {item.title}
                </span>
              </LinkRenderer>
            </>
          )}
        </div>
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
