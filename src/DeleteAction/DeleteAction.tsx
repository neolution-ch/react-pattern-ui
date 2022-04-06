import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface DeleteActionProps {
  title?: string;
  text?: string;
  iconOnly?: boolean;
  onDelete: () => void;
}

function DeleteAction({
  title = "Delete Entry",
  text = "Are you sure to Delete this Entry?",
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
        <Button color="danger" close onClick={toggle}>
          <FontAwesomeIcon icon={faTrash} />
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
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export { DeleteAction, DeleteActionProps };
