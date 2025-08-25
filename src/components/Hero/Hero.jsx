import SearchBox from '../SearchBox/SearchBox';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.content}>
          <h1>Plan, Cook, and Share Your Flavors</h1>
          <SearchBox />
        </div>
      </div>
    </section>
  );
}
