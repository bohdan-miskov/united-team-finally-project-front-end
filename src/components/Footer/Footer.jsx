import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Footer.module.css';
import Logo from '../../assets/img/logo.svg';
import Modal from '../../shared/Modal';

const Footer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const location = useLocation();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.container}>
          <Link className={css.logoBlock} aria-label="Go to home">
            <img
              src={Logo}
              alt="Our logo"
              className={css.logo}
              width={32}
              height={30}
            />
            <span className={css.logoText}>Tasteorama</span>
          </Link>

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
      </div>
    </footer>
  );
};

export default Footer;
