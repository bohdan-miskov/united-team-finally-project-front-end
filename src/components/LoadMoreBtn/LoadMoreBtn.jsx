import React from "react";
import styles from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, isVisible, loading = false }) {
  if (!isVisible) return null;

  return (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        disabled={loading}
        className={`${styles.button} ${loading ? styles.loading : ""}`}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
