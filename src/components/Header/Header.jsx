import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { logOutUser } from '../../redux/auth/operations';

import Logo from '../../assets/img/logo.svg';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import Navigation from './Navigation/Navigation';

import css from './Header.module.css';
import { selectUserProfile } from '../../redux/user/selectors';
import { getUserInfo } from '../../redux/user/operations';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsLoggedIn);

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
    <header className={`${css.header} ${menuOpen ? css.menuOpen : ''}`}>
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

          <BurgerMenu isOpen={menuOpen} onToggle={() => setMenuOpen(v => !v)} />

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

        <nav
          id="mobile-nav"
          className={`${css.mobileMenu} ${menuOpen ? css.open : ''}`}
          aria-label="Mobile"
        >
          <div className={css.container}>
            <Navigation
              isLoggedIn={isLoggedIn}
              closeMenu={() => setMenuOpen(false)}
              userName={userName ?? 'Guest'}
              onLogout={handleLogout}
              isMobile={true}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
