import { getPaginationWindow } from '../../utils/getPaginationWindow';
import styles from './Pagination.module.css';

const WINDOW = 6;

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const { startPage, lastPage } = getPaginationWindow(page, totalPages, 6);
  const pages = Array.from(
    { length: lastPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div aria-label="Pagination" className={styles.container}>
      <ul className={styles.pagination}>
        <li>
          <button
            className={`${styles.pageBtn} brown-btn ${styles.arrow} ${styles.itemPrev}`}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <svg className={styles.paginArrow} width={24} height={24}>
              <use href={'/icons.svg#icon-left-pagin-arrow'} />
            </svg>
          </button>
        </li>

        {pages.map(n => (
          <li key={n}>
            <button
              className={`${styles.pageBtn} ${styles.item} ${
                n === page ? `${styles.active} brown-btn` : 'outline-btn'
              }`}
              onClick={() => onPageChange(n)}
            >
              {n}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`${styles.pageBtn} brown-btn ${styles.arrow} ${styles.itemNext}`}
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <svg className={styles.paginArrow} width={24} height={24}>
              <use href={'/icons.svg#icon-right-pagin-arrow'} />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}
