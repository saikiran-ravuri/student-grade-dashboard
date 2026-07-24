import { useEffect } from "react";

import "./Toast.css";

function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </div>

      <div className="toast-content">
        <h4>
          {type === "success"
            ? "Success"
            : "Error"}
        </h4>

        <p>{message}</p>
      </div>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;