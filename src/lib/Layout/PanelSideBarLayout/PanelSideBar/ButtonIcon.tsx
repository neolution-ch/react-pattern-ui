import { PanelItem } from "./Definitions/PanelItem";
import { Button } from "@neolution-ch/reactstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonIconProps<TPanelItemId extends string, TPanelItem> {
  item: PanelItem<TPanelItemId, TPanelItem>;
  activePanelId?: TPanelItemId;
  renderTilesAsLinks?: boolean;
  setActivePanel: (panelId: TPanelItemId) => void;
}

export const ButtonIcon = <TPanelItemId extends string, TPanelItem>(props: ButtonIconProps<TPanelItemId, TPanelItem>) => {
  const {
    item: { disabled, icon, onClick, id, title },
    activePanelId,
    renderTilesAsLinks,
    setActivePanel,
  } = props;
  return (
    <Button
      key={id}
      color="primary"
      outline
      className={classNames("tile", { active: activePanelId === id })}
      onClick={() => {
        if (!renderTilesAsLinks) {
          if (onClick) {
            onClick();
          } else {
            setActivePanel(id);
          }
        }
      }}
      title={typeof title === "string" ? String(title) : ""}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} size="lg" fixedWidth />}
    </Button>
  );
};
