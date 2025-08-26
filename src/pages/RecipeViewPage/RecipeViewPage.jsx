import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import NotFound from '../../components/NotFound/NotFound';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecipeDetailsIsLoading,
  selectRecipeDetailsError,
  selectRecipeDetails,
} from '../../redux/recipeDetails/selectors.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRecipeDetails } from '../../redux/recipeDetails/operations.js';

export default function RecipeViewPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const loading = useSelector(selectRecipeDetailsIsLoading);
  const error = useSelector(selectRecipeDetailsError);
  const recipe = useSelector(selectRecipeDetails);

  return (
    <>
      {loading && !error && <Loader />}
      {(error || !recipe) && !loading && <NotFound />}
      {!loading && !error && recipe && <RecipeDetails recipe={recipe} />}
    </>
  );
}
