import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser } from "../../redux/auth/selectors";
import css from "./Footer.module.css";
import Logo from "../Logo/Logo.jsx";
import Modal from "../Modal/Modal"; // твій універсальний Modal

const Footer = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = !!user;
  const location = useLocation();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />

        <p className={css.copyright}>
          © {new Date().getFullYear()} CookingCompanion. All rights reserved.
        </p>

        <div className={css.nav}>
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>

          {isLoggedIn ? (
            <NavLink to="/profile" className={css.link}>
              Profile
            </NavLink>
          ) : (
            !location.pathname.includes("/auth") && (
              <button
                type="button"
                className={css.link}
                onClick={() => setAuthModalOpen(true)}
              >
                Profile
              </button>
            )
          )}
        </div>
      </div>

      {authModalOpen && (
        <Modal title="Authorization required" onClose={() => setAuthModalOpen(false)}>
          <p>You need to log in or register to view your profile.</p>
          <div className={css.modalActions}>
            <button
              onClick={() => {
                setAuthModalOpen(false);
                navigate("/auth/login");
              }}
            >
              Log in
            </button>
            <button
              onClick={() => {
                setAuthModalOpen(false);
                navigate("/auth/register");
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

