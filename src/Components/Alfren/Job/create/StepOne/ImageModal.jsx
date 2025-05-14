import React, { useState } from "react";
import Modal from "react-modal";
import howToGetUrlImage from "../../../../../assets/images/how_to_get_url.png";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="How to Get URL"
      style={{
        content: {
          maxWidth: "80%",
          maxHeight: "80%",
          margin: "auto",
          borderRadius: "8px",
        //   padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          position: "absolute",
          top: "25px",
          right: "30px",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "white",
        }}
      >
        ✕
      </button>
      <img
        src={howToGetUrlImage}
        alt="How to Get URL"
        style={{ width: "100%"}}
      />
    </Modal>
  );
};

export default ImageModal;
