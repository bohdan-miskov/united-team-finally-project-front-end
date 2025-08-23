import css from "./BurgerMenu.module.css";

export default function BurgerMenu({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      className={isOpen ? css.closeBtn : css.burgerBtn}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={!!isOpen}
      aria-controls="mobile-nav"
    >
      <svg
        className={isOpen ? css.closeIcon : css.burgerIcon}
        width="24"
        height="24"
        aria-hidden="true"
        focusable="false"
      >
        <use href={isOpen ? "/icons.svg#icon-close" : "/icons.svg#icon-burger"}></use>
      </svg>
    </button>
  );
}
