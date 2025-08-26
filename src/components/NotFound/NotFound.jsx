import { useMediaQuery } from 'react-responsive';
import css from './NotFound.module.css';
import Image from '../../assets/img/not-found/plate-mob.webp';
import Image2 from '../../assets/img/not-found/plate-mob@2x.webp';
import ImageTablet from '../../assets/img/not-found/plate-tab.webp';
import ImageTablet2 from '../../assets/img/not-found/plate-tab@2x.webp';

export default function NotFound() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <section className={css.section}>
      <div className={`container ${css.wrapper}`}>
        {isMobile && (
          <img
            className={css.img}
            src={Image}
            srcSet={`${Image} 1x, ${Image2} 2x`}
            alt="Recipe was not found"
          />
        )}

        {isTabletOrDesktop && (
          <img
            className={css.img}
            src={ImageTablet}
            srcSet={`${ImageTablet} 1x, ${ImageTablet2} 2x`}
            alt="Recipe was not found"
          />
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
