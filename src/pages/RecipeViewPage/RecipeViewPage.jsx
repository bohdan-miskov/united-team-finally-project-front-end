import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import NotFound from '../../components/NotFound/NotFound';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';
import {
  selectRecipeDetailsIsLoading,
  selectRecipeDetailsError,
} from '../../redux/recipeDetails/selectors.js';

export default function RecipeViewPage() {
  const loading = useSelector(selectRecipeDetailsIsLoading);
  const error = useSelector(selectRecipeDetailsError);

  return (
    <>
      {loading && !error && <Loader />}
      {error && <NotFound />}
      {!loading && !error && <RecipeDetails />}
    </>
  );
}
