import { useDispatch, useSelector } from 'react-redux';
import { changeSearchQuery } from '../../redux/filters/slice';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(state => state.filters.searchQuery);

  const handleChange = e => {
    dispatch(changeSearchQuery(e.target.value));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim() || query.trim().length < 2) {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search recipes"
        className={styles.input}
      />
      {/* <button type="submit" className={styles.button}>
        Search
      </button> */}
    </form>
  );
}
