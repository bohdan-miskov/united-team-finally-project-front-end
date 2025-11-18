import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useCallback } from 'react';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Footer.module.css';
import Logo from '../../assets/img/logo.svg';
import AuthenticateModal from '../AuthenticateModal/AuthenticateModal';
import { HashLink, NavHashLink } from 'react-router-hash-link';

const Footer = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.container}>
          <HashLink
            smooth
            className={css.logoBlock}
            to="/#header"
            aria-label="Go to home"
          >
            <img
              src={Logo}
              alt="Our logo"
              className={css.logo}
              width={32}
              height={30}
            />
            <span className={css.logoText}>Tasteorama</span>
          </HashLink>

          <p className={css.copyright}>
            © {year} Tasteorama. All rights reserved.
          </p>

          <nav className={css.nav} aria-label="Footer navigation">
            <HashLink smooth to="/#header" className={css.link}>
              Recipes
            </HashLink>

            {isLoggedIn ? (
              <HashLink to="/profile" className={css.link}>
                Account
              </HashLink>
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

        <AuthenticateModal
          isOpen={authModalOpen}
          onClose={() => closeAuthModal()}
          title="Authorization required"
          content="You need to log in or register to view your account"
        />
      </div>
    </footer>
  );
};

export default Footer;
