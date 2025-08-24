import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { fetchLogoutUser } from "../../redux/auth/operations";

import Logo from "../../assets/img/logo.svg";
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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(fetchLogoutUser());
    } catch (_) {
      // ignore
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      setMenuOpen(false);
    }
  }, [dispatch, navigate]);

  return (
    <header className={`${css.header} ${menuOpen ? css.menuOpen : ""}`}>
      <div className={css.container}>
        <div className={css.logoBlock} onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className={css.logo} />
          <span className={css.logoText}>CookingCompanion</span>
        </div>

        <BurgerMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />

        <div className={css.desktopNav}>
          <Navigation
            isLoggedIn={isLoggedIn}
            closeMenu={() => {}}
            userName={userName}
            onLogout={handleLogout}
            isMobile={false}
          />
        </div>
      </div>

      {menuOpen && (
        <div className={`${css.mobileMenu} ${css.open}`} id="mobile-nav">
          <div className={css.container}>
            <Navigation
              isLoggedIn={isLoggedIn}
              closeMenu={() => setMenuOpen(false)}
              userName={userName}
              onLogout={handleLogout}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </header>
  );
}
