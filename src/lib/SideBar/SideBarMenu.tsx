import { useSideBarMenuContext } from "./SideBarMenuContext";
import { SideBarMenuItem } from "./SideBarMenuItem";

interface SideBarMenuProps {
  theme: "dark" | "light";
}

const SideBarMenu = ({ theme }: SideBarMenuProps) => {
  const { items } = useSideBarMenuContext();

  return (
    <div id="layout-sidenav__nav">
      <nav className={`sb-sidenav accordion sb-sidenav-${theme}`}>
        <div className="sb-sidenav-menu">
          <div className="nav">
            {items?.map((x, i) => (
              <SideBarMenuItem key={i} item={x} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarMenu;
