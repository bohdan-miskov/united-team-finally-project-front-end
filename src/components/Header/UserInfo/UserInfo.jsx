import { useState } from 'react';
import css from './UserInfo.module.css';
import ConfirmLogoutModal from '../ConfirmLogoutModal/ConfirmLogoutModal';

export default function UserInfo({ userName = 'User', onLogout, className }) {
  const [showModal, setShowModal] = useState(false);
  const initial = userName?.trim()?.[0]?.toUpperCase() || '?';

  return (
    <div className={`${css.wrapper} ${className || ''}`}>
      <div className={css.avatar}>{initial}</div>
      <span className={css.name}>{userName || 'Guest'}</span>
      <div className={css.divider} />

      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => setShowModal(true)}
        aria-label="Logout"
        title="Logout"
      >
        <svg
          className={css.logoutIcon}
          width="24"
          height="24"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/icons.svg#icon-exit"></use>
        </svg>
      </button>

      {showModal && (
        <ConfirmLogoutModal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            onLogout?.();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
