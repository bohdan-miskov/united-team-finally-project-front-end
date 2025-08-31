import BaseModal from '../../BaseModal/BaseModal';
import css from './ConfirmLogoutModal.module.css';

export default function ConfirmLogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <h3 className={css.title}>Are you sure?</h3>
        <p className={css.text}>We will miss you!</p>
        <div className={css.actions}>
          <button
            type="button"
            className={`${css.cancelBtn} dark-outline-btn`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${css.logoutBtn} red-btn`}
            onClick={onConfirm}
          >
            Log out
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
