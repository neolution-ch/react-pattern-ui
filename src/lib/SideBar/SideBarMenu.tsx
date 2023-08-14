import { useSideBarMenuContext } from "./SideBarMenuContext";
import { SideBarMenuItem } from "./SideBarMenuItem";

interface SideBarMenuProps {
  theme: "dark" | "light";
}

const SideBarMenu = ({ theme }: SideBarMenuProps) => {
  const { items } = useSideBarMenuContext();

  const sidenavClass = theme == "dark" ? "sb-sidenav-dark" : "";

  return (
    <div id="layout-sidenav__nav">
      <nav className={`sb-sidenav accordion ${sidenavClass}`}>
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
