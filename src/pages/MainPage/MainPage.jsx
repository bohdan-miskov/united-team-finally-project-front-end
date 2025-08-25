import Hero from './components/Hero';
import Filters from '../../components/Filters/Filters';
import RecipesList from '../../components/RecipesList/RecipesList';
import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <div>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className={styles.title}>Recepies</h2>
          <Filters />
          <RecipesList recipeType="all" />
        </div>
      </section>
    </div>
  );
}
