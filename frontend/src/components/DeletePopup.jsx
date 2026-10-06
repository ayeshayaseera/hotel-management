function DeletePopup({ onConfirm, onCancel }) {
  return (
    <div className="popup-overlay">

      <div className="popup-box">

        <h2>Delete Hotel?</h2>

        <p>
          Are you sure you want to delete this hotel?
        </p>

        <div className="popup-buttons">

          <button
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeletePopup;