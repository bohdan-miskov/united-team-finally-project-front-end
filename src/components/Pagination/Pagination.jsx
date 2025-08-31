import styles from './Pagination.module.css';

const WINDOW = 6;

export default function Pagination({ page, totalPages, onPageChange }) {
  const start = Math.max(1, Math.min(page - 2, totalPages - WINDOW + 1));
  const count = Math.min(WINDOW, totalPages || WINDOW);
  const pages = Array.from({ length: count }, (_, i) => start + i);

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
