import { useEffect } from "react";

import "./ConfirmModal.css";

function ConfirmModal({ isOpen, title, message, onCancel, onConfirm }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
      >
        <h2 id="confirm-modal-title">{title}</h2>

        <p id="confirm-modal-message">{message}</p>

        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button type="button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmModal;
