import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecipeDetails } from '../../redux/recipeDetails/selectors.js';
import { useParams } from 'react-router-dom';
import css from './RecipeDetails.module.css';
import { useEffect } from 'react';
import { getRecipeDetails } from '../../redux/recipeDetails/operations.js';

export default function RecipeDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [dispatch, id]);

  const recipe = useSelector(selectRecipeDetails);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <section>
      <div className="container">
        {isTabletOrDesktop && <h1 className={css.header}>{recipe.title}</h1>}
        {isMobile && (
          <img className={css.img} src={recipe.thumb} alt={recipe.title} />
        )}
        {isTablet && (
          <img className={css.img} src={recipe.thumb} alt={recipe.title} />
        )}
        {isDesktop && (
          <img className={css.img} src={recipe.thumb} alt={recipe.title} />
        )}
        {isMobile && <h1 className={css.header}>{recipe.title}</h1>}
        <div className={css.desktopWrapper}>
          <div className={css.tabletWrapper}>
            <div className={css.wrapper}>
              <h3 className={css.infoHeader}>General informations</h3>
              <ul className={css.generalList}>
                <li>
                  <p>
                    <strong>Category: </strong>
                    {recipe.category}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cooking time: </strong>
                    {recipe.time} minutes
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Caloric content: </strong>Approximately{' '}
                    {recipe.cals} kcal per serving
                  </p>
                </li>
              </ul>
            </div>
            <button type="button" className={`brown-btn ${css.button}`}>
              Save
              <svg className={css.icon} width={24} height={24}>
                <use href="/icons.svg#icon-save-to-list"></use>
              </svg>
            </button>
          </div>
          <ul className={css.contentList}>
            <li>
              <h2 className={css.h2}>About recipe</h2>
              <p>{recipe.description}</p>
            </li>
            <li>
              <h2 className={css.h2}>Ingredients:</h2>
              <ul className={css.ingredientsList}>
                {recipe.ingredients.map((ingredient, idx) => {
                  return (
                    <li key={ingredient._id || idx}>• {ingredient.name}</li>
                  );
                })}
              </ul>
            </li>
            <li>
              <h2 className={css.prepHeader}>Preparation Steps:</h2>
              <p>{recipe.instructions}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
