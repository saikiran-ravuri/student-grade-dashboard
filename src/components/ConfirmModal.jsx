import "./ConfirmModal.css";

function ConfirmModal({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
    >
      <div
        className="confirm-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-icon">
          ⚠️
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
