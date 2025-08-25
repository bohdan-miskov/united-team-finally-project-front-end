import { useEffect } from "react";
import ReactDOM from "react-dom";
import s from "./Modal.module.scss";

const modalRoot = document.getElementById("modal-root") || document.body;

export default function Modal({ isOpen = true, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          {title && <h3 className={s.title}>{title}</h3>}
          <button className={s.close} onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
