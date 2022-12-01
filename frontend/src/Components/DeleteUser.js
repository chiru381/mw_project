import React from "react";
import "../Styles/DeleteUser.css";
import Loader from "../SharableComponents/Loader";

function DeleteUser({ onCancel, onDelete, loading }) {
  return (
    <div className="popup-background">
      <div className="delete-container">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this account ?</p>

        <div className="buttons-container">
          <button className="delete-button btn" onClick={onDelete}>
            {loading ? <Loader /> : "Delete"}
          </button>
          <button className="cancel-button" disabled={loading} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
