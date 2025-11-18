import Hero from '../../components/Hero/Hero';
import Filters from '../../components/Filters/Filters';
import RecipesList from '../../components/RecipesList/RecipesList';
import styles from './MainPage.module.css';
import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../../redux/filters/selectors';

export default function MainPage() {
  const searchQuery = useSelector(selectSearchQuery);
  return (
    <div>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className={styles.title}>
            {searchQuery.length > 0
              ? `Search Results for “${searchQuery}”`
              : 'Recepies'}
          </h2>
          <Filters recipeType="all" />
          <RecipesList recipeType="all" />
        </div>
      </section>
    </div>
  );
}
