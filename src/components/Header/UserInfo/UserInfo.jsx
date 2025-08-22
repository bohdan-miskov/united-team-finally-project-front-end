import { useState } from "react";
import css from "./UserInfo.module.css";
import Icon from "../../shared/Icon/Icon";
import ConfirmLogoutModal from "../ConfirmLogoutModal/ConfirmLogoutModal";

export default function UserInfo({ userName = "User", onLogout, className }) {
  const [showModal, setShowModal] = useState(false);
  const initial = userName?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <div className={`${css.wrapper} ${className || ""}`}>
      <div className={css.avatar}>{initial}</div>
      <span className={css.name}>{userName || "Guest"}</span>
      <div className={css.divider}></div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => setShowModal(true)}
        aria-label="Logout"
        title="Logout"
      >
        <Icon name="logout" className={css.logoutIcon} />
      </button>

      {showModal && (
        <ConfirmLogoutModal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            onLogout();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

