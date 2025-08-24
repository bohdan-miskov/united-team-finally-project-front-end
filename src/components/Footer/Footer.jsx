import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser } from "../../redux/auth/selectors";
import css from "./Footer.module.css";
import Logo from "../../assets/img/logo.svg";
import Modal from "../../shared/Modal/Modal";

const Footer = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = !!user;
  const location = useLocation();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.logoBlock} onClick={() => navigate("/")}>
          <img src={Logo} alt="Logo" className={css.logo} />
          <span className={css.logoText}>CookingCompanion</span>
        </div>

        <p className={css.copyright}>
          © {new Date().getFullYear()} CookingCompanion. All rights reserved.
        </p>

        <div className={css.nav}>
          <NavLink to="/" className={css.link}>
            Recipes
          </NavLink>

          {isLoggedIn ? (
            <NavLink to="/profile" className={css.link}>
              Account
            </NavLink>
          ) : (
            !location.pathname.includes("/auth") && (
              <button
                type="button"
                className={css.link}
                onClick={() => setAuthModalOpen(true)}
              >
                Account
              </button>
            )
          )}
        </div>
      </div>

      {authModalOpen && (
        <Modal title="Authorization required" onClose={() => setAuthModalOpen(false)}>
          <p>You need to log in or register to view your account.</p>
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



