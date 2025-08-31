import styles from './Pagination.module.css';

const WINDOW = 6;

export default function Pagination({ page, totalPages, onPageChange }) {
  const start = Math.max(1, Math.min(page - 2, totalPages - WINDOW + 1));
  const count = Math.min(WINDOW, totalPages || WINDOW);
  const pages = Array.from({ length: count }, (_, i) => start + i);

  return (
    <nav aria-label="Pagination" className={styles.container}>
      <ul className={styles.pagination}>
        <li
          className={`${styles.pageBtn} ${styles.arrow} ${styles.itemPrev}`}
          onClick={() => page > 1 && onPageChange(page - 1)}
        >
          <svg className={styles.paginArrow}>
            <use href={'/icons.svg#icon-left-pagin-arrow'} />
          </svg>
        </li>

        {pages.map(n => (
          <li
            key={n}
            className={`${styles.pageBtn} ${styles.item} ${
              n === page ? styles.active : ''
            }`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </li>
        ))}

        <li
          className={`${styles.pageBtn} ${styles.arrow} ${styles.itemNext}`}
          onClick={() => page < totalPages && onPageChange(page + 1)}
        >
          <svg className={styles.paginArrow}>
            <use href={'/icons.svg#icon-right-pagin-arrow'} />{' '}
          </svg>
        </li>
      </ul>
    </nav>
  );
}
