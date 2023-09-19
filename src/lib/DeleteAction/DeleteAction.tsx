import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface DeleteActionProps {
  title?: string;
  text?: string;
  buttonText?: string;
  deleteButtonText?: string;
  cancelButtonText?: string;
  iconOnly?: boolean;
  onDelete: () => void;
}

function DeleteAction({
  title = "Delete Entry",
  text = "Are you sure to Delete this Entry?",
  buttonText = "Delete",
  deleteButtonText = "Delete",
  cancelButtonText = "Cancel",
  iconOnly = false,
  onDelete,
}: DeleteActionProps) {
  const [showModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(!showModal);

  return (
    <React.Fragment>
      {iconOnly ? (
        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px", cursor: "pointer" }} onClick={toggle} />
      ) : (
        <Button color="danger" onClick={toggle}>
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faTrash} />
          {buttonText}
        </Button>
      )}
      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              onDelete();
              toggle();
            }}
          >
            {deleteButtonText}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            {cancelButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export { DeleteAction, DeleteActionProps };
