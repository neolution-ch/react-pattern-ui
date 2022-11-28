import { useSideBarMenuContext } from "./SideBarMenuContext";
import { SideBarMenuItem } from "./SideBarMenuItem";

const SideBarMenu = () => {
  const { state } = useSideBarMenuContext();

  if (!state) return null;

  return (
    <div id="layout-sidenav__nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {state.items?.map((x, i) => (
              <SideBarMenuItem key={i} item={x} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBarMenu;
