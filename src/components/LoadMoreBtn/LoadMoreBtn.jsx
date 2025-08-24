import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onLoadMore, hasMore, loading }) {
  if (!hasMore) return null;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={onLoadMore}
        disabled={loading}
        className={`${styles.button} ${loading ? styles.loading : ''}`}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
