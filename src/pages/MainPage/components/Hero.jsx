import SearchBox from "../../../components/SearchBox/SearchBox";
import styles from "./Hero.module.css";

export default function Hero({ onSearchResults }) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Plan, Cook, and Share Your Flavors</h1>
          <SearchBox onResults={onSearchResults} />
        </div>
      </div>
    </section>
  );
}
