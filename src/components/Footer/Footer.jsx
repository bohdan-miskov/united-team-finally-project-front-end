import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { selectIsAuthenticated } from '../../redux/auth/selectors';
import css from './Footer.module.css';
import Logo from '../../assets/img/logo.svg';
import Modal from '../../shared/Modal';

const Footer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoggedIn = isAuthenticated;

  const location = useLocation();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <button
          type="button"
          className={css.logoBlock}
          onClick={() => navigate('/')}
          aria-label="Go to home"
        >
          <img src={Logo} alt="" className={css.logo} width={24} height={24} />
          <span className={css.logoText}>Tasteorama</span>
        </button>

        <p className={css.copyright}>
          © {year} Tasteorama. All rights reserved.
        </p>

        <nav className={css.nav} aria-label="Footer navigation">
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>

          {isLoggedIn ? (
            <NavLink to="/profile" className={css.link}>
              Account
            </NavLink>
          ) : (
            !location.pathname.includes('/auth') && (
              <button
                type="button"
                className={css.link}
                onClick={openAuthModal}
              >
                Account
              </button>
            )
          )}
        </nav>
      </div>

      {authModalOpen && (
        <Modal title="Authorization required" onClose={closeAuthModal}>
          <p>You need to log in or register to view your account.</p>
          <div className={css.modalActions}>
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
              onClick={() => {
                closeAuthModal();
                navigate('/auth/register');
              }}
            >
              Register
            </button>
          </div>
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
