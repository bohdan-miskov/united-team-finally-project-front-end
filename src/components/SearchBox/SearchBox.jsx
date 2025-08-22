import { useState } from "react";
import styles from "./SearchBox.module.css";

export default function SearchBox({ recipes, onResults }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim().length < 2) {
      setError("Minimum 2 characters");
      return;
    }

    setError("");

    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    if (onResults) onResults(filtered);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}
