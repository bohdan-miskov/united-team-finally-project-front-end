import Hero from './components/Hero';
import Filters from '../../components/Filters/Filters';
import RecipesList from '../../components/RecipesList/RecipesList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';

export default function MainPage() {
  return (
    <div>
      <Hero />
      <Filters />
      <RecipesList recipeType="all" />
    </div>
  );
}
