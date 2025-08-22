import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import UserInfo from "../UserInfo/UserInfo";

export default function Navigation({
  isLoggedIn = false,
  closeMenu = () => {},
  userName = "",
  userInitial = "U",
  onLogout = () => {},
  isMobile = false,
}) {
  return (
    <nav className={css.navGroup}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${css.link} ${css.recipes} ${isActive ? css.active : ""}`
        }
        onClick={closeMenu}
      >
        Рецепти
      </NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `${css.link} ${css.login} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Увійти
          </NavLink>

          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              `${css.linkBtn} ${css.register} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Зареєструватися
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${css.link} ${css.profile} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Мій профіль
          </NavLink>

          <NavLink
            to="/add-recipe"
            className={({ isActive }) =>
              `${css.linkBtn} ${css.addRecipe} ${isActive ? css.active : ""}`
            }
            onClick={closeMenu}
          >
            Додати рецепт
          </NavLink>

          <div className={css.userInfo}>
            <UserInfo
              userName={userName}
              userInitial={userInitial}
              onLogout={onLogout}
              isMobile={isMobile}
            />
          </div>
        </>
      )}
    </nav>
  );
}
