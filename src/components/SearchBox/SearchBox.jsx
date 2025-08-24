import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchQuery } from '../../redux/filters/slice';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim().length < 2) {
      setError('Minimum 2 characters');
      return;
    }

    setError('');
    dispatch(changeSearchQuery(query));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
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
