import React from "react";
import "../Styles/Messages.css";
import CloseIcon from "@mui/icons-material/Close";

function ErrorMessage({ message, onClose }) {
  return (
    <div className="messages-container error">
      <div className="bar-error"></div>
      <p>{message}</p>
      <CloseIcon className="close-icon-error" onClick={onClose} />
    </div>
  );
}

function SuccessMessage({ message, onClose }) {
  return (
    <div className="messages-container success">
      <div className="bar-success"></div>
      <p> {message} </p>
      <CloseIcon className="close-icon-success" onClick={onClose} />
    </div>
  );
}

export { ErrorMessage, SuccessMessage };
