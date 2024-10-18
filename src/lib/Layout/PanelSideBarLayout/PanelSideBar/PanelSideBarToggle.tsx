import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "reactstrap";
import { usePanelSideBarContext } from "./Context/PanelSideBarContext";
import classNames from "classnames";

interface PanelSideBarToggleProps extends ButtonProps {
  toggled: boolean;
}

export const PanelSideBarToggle = (props: PanelSideBarToggleProps) => {
  const { toggled, ...buttonProps } = props;
  const { theme, isIconShownOnSidebarCollapse } = usePanelSideBarContext();

  return (
    <Button
      {...buttonProps}
      className={classNames(
        { "side-nav-toggle-dark": theme == "dark" },
        { "side-nav-toggle-light": theme == "light" },
        { "side-nav-toggle-blue": theme == "blue" },
        { "show-icons": isIconShownOnSidebarCollapse },
      )}
      id="side-nav-toggle"
      color="primary"
    >
      <FontAwesomeIcon className="toggler" icon={toggled ? faAngleRight : faAngleLeft} />
    </Button>
  );
};
