import s from './AuthenticateModal.module.css';
import { Link } from 'react-router-dom';
import BaseModal from '../BaseModal/BaseModal';

export default function AuthenticateModal({
  isOpen,
  onClose,
  title = 'Authorization required',
  content = 'You need to log in or register to perform this action',
}) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
      </div>
      <div className={s.content}>
        <p>{content}</p>
        <div className={s.modalActions}>
          <Link to="/auth/login" className="dark-outline-btn" onClick={onClose}>
            Log in
          </Link>
          <Link to="/auth/register" className="brown-btn" onClick={onClose}>
            Register
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}
