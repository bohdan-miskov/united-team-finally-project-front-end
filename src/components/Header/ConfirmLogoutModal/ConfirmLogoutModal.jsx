import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./ConfirmLogoutModal.module.css";

export default function ConfirmLogoutModal({ onClose, onConfirm }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className={css.closeIcon}
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false"
          >
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>

        <div className={css.content}>
          <h2 id="dialog-title" className={css.title}>Are you sure?</h2>
          <p className={css.text}>We will miss you!</p>
          <div className={css.actions}>
            <button type="button" className={css.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="button" className={css.logoutBtn} onClick={onConfirm}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}



