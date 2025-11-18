import { useEffect } from 'react';
import css from './MobileMenu.module.css';
import Navigation from '../Navigation/Navigation';

export default function MobileMenu({
  isOpen,
  setMenuOpen,
  isLoggedIn,
  userName,
  handleLogout,
}) {
  useEffect(() => {
    if (!isOpen) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleEsc = e => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, setMenuOpen]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) setMenuOpen(false);
  };

  return (
    <div
      className={`${css.overlay} ${isOpen ? css.open : ''}`}
      onClick={handleOverlayClick}
    >
      <nav
        id="mobile-nav"
        className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}
        aria-label="Mobile"
      >
        <div className="container">
          <div className={css.container}>
            <Navigation
              isLoggedIn={isLoggedIn}
              closeMenu={() => setMenuOpen(false)}
              userName={userName ?? 'Guest'}
              onLogout={handleLogout}
              isMobile={true}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
