import Hero from './components/Hero';
import Filters from '../../components/Filters/Filters';
import RecipesList from '../../components/RecipesList/RecipesList';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const recipes = useSelector(state => state.recipes.all.items);

  return (
    <div>
      <Hero />
      <Filters />
      <RecipesList recipes={recipes} />
    </div>
  );
}
