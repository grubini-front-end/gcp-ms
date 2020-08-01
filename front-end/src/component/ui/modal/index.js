import React from "react";
import { Modal, Button } from "react-bootstrap";

const GenericModal = React.memo(props => {
  return (
    <Modal show={props.show} onHide={props.cancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.cancel}>
          Close
        </Button>
        <Button variant="primary" onClick={props.complete}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default GenericModal;
