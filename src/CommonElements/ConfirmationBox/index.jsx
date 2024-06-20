import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes, FaTrash } from 'react-icons/fa';
import './ConfirmationBox.scss';

const ConfirmationModal = ({ handleClose, show, deleteJob, isLoading }) => {

  return (
    <div className="text-center">
      <Modal  show={show} onHide={handleClose} centered className="modal-confirm">
        <Modal.Header className="flex-column">
          <div className="icon-box">
            <FaTrash size={46} />
          </div>
          <h4 className="modal-title w-100">Are you sure?</h4>
          <Button variant="close" onClick={handleClose} aria-label="Close" className="close-button">
            <FaTimes />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete these records?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className='cancel-btn-style' onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} variant="danger" onClick={() => { deleteJob(); }}>
            <span>
              {isLoading ? (
                <>
                  <i className="fa fa-spinner fa-spin" /> Loading...
                </>
              ) : (
                "Delete"
              )}
            </span>
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
