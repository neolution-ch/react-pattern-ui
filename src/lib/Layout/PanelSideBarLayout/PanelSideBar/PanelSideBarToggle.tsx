import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "reactstrap";

interface PanelSideBarToggleProps extends ButtonProps {
  toggled: boolean;
}

export const PanelSideBarToggle = (props: PanelSideBarToggleProps) => {
  const { toggled, ...buttonProps } = props;

  return (
    <Button {...buttonProps} id="side-nav-toggle" color="primary">
      <FontAwesomeIcon icon={toggled ? faAngleRight : faAngleLeft} />
    </Button>
  );
};
