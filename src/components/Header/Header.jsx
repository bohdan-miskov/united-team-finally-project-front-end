import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { fetchLogoutUser } from "../../redux/auth/operations";

import Logo from "../Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import Navigation from "./Navigation/Navigation";

import css from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(user);
  const userName = user?.name || "Guest";
  const userInitial = useMemo(
    () => (userName?.trim()?.[0]?.toUpperCase() || "U"),
    [userName]
  );

  useEffect(() => {
    setMenuOpen(false); // закриваємо меню при зміні роуту
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(fetchLogoutUser());
    } catch (_) {
      // ignore error
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      setMenuOpen(false);
    }
  }, [dispatch, navigate]);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />

        <BurgerMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />

        <div className={css.desktopNav}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => {}}
            userName={userName}
            userInitial={userInitial}
            onLogout={handleLogout}
            isMobile={false}
          />
        </div>
      </div>

      {menuOpen && (
        <div className={`${css.mobileMenu} ${css.open}`}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => setMenuOpen(false)}
            userName={userName}
            userInitial={userInitial}
            onLogout={handleLogout}
            isMobile={true}
          />
        </div>
      )}
    </header>
  );
}


