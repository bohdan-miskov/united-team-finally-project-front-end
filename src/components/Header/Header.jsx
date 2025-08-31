import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { logOutUser } from '../../redux/auth/operations';

import Logo from '../../assets/img/logo.svg';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Navigation from './Navigation/Navigation';

import css from './Header.module.css';
import { selectUserError, selectUserProfile } from '../../redux/user/selectors';
import { getUserInfo } from '../../redux/user/operations';
import MobileMenu from './MobileMenu/MobileMenu';
import { useMediaQuery } from 'react-responsive';
import { ERROR_MESSAGES } from '../../constants';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectUserError);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: 'User is not found. Please try again later.',
  };

  useEffect(() => {
    isLoggedIn && dispatch(getUserInfo());
  }, [dispatch, isLoggedIn]);

  const userName = useSelector(selectUserProfile)?.name ?? 'Guest';

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logOutUser());
    } finally {
      navigate('/');
      setMenuOpen(false);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <header
        className={`${css.header} ${menuOpen ? css.menuOpen : ''}`}
        id="header"
      >
        <div className="container">
          <div className={css.container}>
            <Link className={css.logoBlock} to="/" aria-label="Go to home">
              <img
                src={Logo}
                alt="Our logo"
                className={css.logo}
                width={32}
                height={30}
              />
              <span className={css.logoText}>Tasteorama</span>
            </Link>

            <BurgerMenu
              isOpen={menuOpen}
              onToggle={() => setMenuOpen(v => !v)}
            />

            <nav className={css.desktopNav} aria-label="Primary">
              <Navigation
                isLoggedIn={isLoggedIn}
                closeMenu={() => {}}
                userName={userName ?? 'Guest'}
                onLogout={handleLogout}
                isMobile={false}
              />
            </nav>
          </div>

          {isMobile && (
            <MobileMenu
              isLoggedIn={isLoggedIn}
              closeMenu={() => setMenuOpen(false)}
              userName={userName ?? 'Guest'}
              onLogout={handleLogout}
              isMobile={true}
              isOpen={menuOpen}
              handleLogout={() => dispatch(logOutUser())}
              setMenuOpen={setMenuOpen}
            />
          )}
        </div>
      </header>
      {error && (
        <ErrorToastMessage>
          {errorMessages[error.status] ??
            'Failed to load user. Please retry in a moment'}
        </ErrorToastMessage>
      )}
    </>
  );
}
