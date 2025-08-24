import { useMediaQuery } from 'react-responsive';
import css from './NotFound.module.css';
import Image from '../../assets/img/not-found/plate-mob.webp';
import ImageTablet from '../../assets/img/not-found/plate-tab.webp';

export default function NotFound() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <section className={css.desktopSection}>
      <div className={`container ${css.wrapper}`}>
        {isMobile && <img className={css.img} src={Image} alt="omelette" />}
        {isTabletOrDesktop && (
          <img className={css.img} src={ImageTablet} alt="omelette" />
        )}
        <h1 className={css.h1}>404</h1>
        <h3 className={css.h3}>Recipe not found</h3>
        <button type="button" className={`brown-btn ${css.button}`}>
          <svg className={css.icon} width={24} height={24}>
            <use href="/icons.svg#icon-left-short-arrow"></use>
          </svg>
          Back To Home
        </button>
      </div>
    </section>
  );
}
