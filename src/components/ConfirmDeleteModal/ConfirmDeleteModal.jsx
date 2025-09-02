import BaseModal from '../BaseModal/BaseModal';
import css from './ConfirmDeleteModal.module.css';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <h3 className={css.title}>Delete recipe?</h3>
        <p className={css.text}>This action cannot be undone.</p>
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
            className={`${css.deleteBtn} red-btn`}
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
