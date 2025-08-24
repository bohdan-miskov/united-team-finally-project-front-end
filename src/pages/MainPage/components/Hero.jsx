import SearchBox from '../../../components/SearchBox/SearchBox';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className="container">
          <div className={styles.content}>
            <h1>Plan, Cook, and Share Your Flavors</h1>
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}
