import Icon from "../../shared/Icon/Icon";
import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      className={isOpen ? css.closeBtn : css.burgerBtn}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <Icon
        name={isOpen ? "close" : "burger"}
        className={isOpen ? css.closeIcon : css.burgerIcon}
      />
    </button>
  );
}
