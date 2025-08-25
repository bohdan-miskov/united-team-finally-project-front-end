import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsAuthenticated } from '../../redux/auth/selectors';
import { logOutUser } from '../../redux/auth/operations';

import Logo from '../../assets/img/logo.svg';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Navigation from './Navigation/Navigation';

import css from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = useSelector(selectIsAuthenticated);
  const userData = useSelector(state => state.user?.data);
  const userName = isAuth && userData?.name ? userData.name : 'Guest';
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';
  // const user = useSelector(selectUser);
  // const userName = user?.name || 'Guest';

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
    <header className={`${css.header} ${menuOpen ? css.menuOpen : ''}`}>
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

        <button
          type="button"
          className={css.burgerBtn}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <BurgerMenu isOpen={menuOpen} />
        </button>

        <nav className={css.desktopNav} aria-label="Primary">
          <Navigation
            isLoggedIn={isAuth}
            closeMenu={() => {}}
            userName={userName}
            userInitial={userInitial}
            onLogout={handleLogout}
            isMobile={false}
          />
        </nav>
      </div>

      <nav
        id="mobile-nav"
        className={`${css.mobileMenu} ${menuOpen ? css.open : ''}`}
        aria-label="Mobile"
      >
        <div className={css.container}>
          <Navigation
            isLoggedIn={isAuth}
            closeMenu={() => setMenuOpen(false)}
            userName={userName}
            userInitial={userInitial}
            onLogout={handleLogout}
            isMobile={true}
          />
        </div>
      </nav>
    </header>
  );
}
