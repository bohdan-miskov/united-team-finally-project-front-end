import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import s from './AuthenticateModal.module.css';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modal-root') || document.body;

export default function Modal({ isOpen = true, closeAuthModal }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = e => e.key === 'Escape' && closeAuthModal?.();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeAuthModal]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={s.backdrop}
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
    >
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <div className={s.header}>
          <h3 className={s.title}>Authorization required</h3>
          <button
            className={s.closeBtn}
            onClick={closeAuthModal}
            aria-label="Close"
          >
            <svg
              className={s.closeIcon}
              width="16"
              height="16"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <div className={s.content}>
          {' '}
          <p>You need to log in or register to view your account.</p>
          <div className={s.modalActions}>
            <button
              type="button"
              onClick={() => {
                closeAuthModal();
                navigate('/auth/login');
              }}
            >
              Log in
            </button>
            <button
              type="button"
              className="brown-btn"
              onClick={() => {
                closeAuthModal();
                navigate('/auth/register');
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
