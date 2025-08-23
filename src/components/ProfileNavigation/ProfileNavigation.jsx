import { NavLink } from 'react-router-dom';
import styles from './ProfileNavigation.module.css';

export default function ProfileNavigation() {
  return (
    <nav className={styles.profileNav}>
      <NavLink
        to="/profile/own"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        My Recipes
      </NavLink>
      <NavLink
        to="/profile/favorites"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Saved Recipes
      </NavLink>
    </nav>
  );
}
