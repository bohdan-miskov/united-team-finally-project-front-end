import { useMediaQuery } from "react-responsive";
import css from "./RecipeDetails.module.css";
import Image from "./img/Image.jpg";
import ImageTablet from "./img/ImageTablet.jpg";
import ImageDesktop from "./img/ImageDesktop.jpg";

export default function RecipeDetails() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <section>
      <div className="container">
        {isTabletOrDesktop && <h1 className={css.header}>French Omelette</h1>}
        {isMobile && (
          <img
            className={css.img}
            src={Image}
            alt="omelette"
          />
        )}
        {isTablet && (
          <img
            className={css.img}
            src={ImageTablet}
            alt="omelette"
          />
        )}
        {isDesktop && (
          <img
            className={css.img}
            src={ImageDesktop}
            alt="omelette"
          />
        )}
        {isMobile && <h1 className={css.header}>French Omelette</h1>}
        <div className={css.desktopWrapper}>
          <div className={css.tabletWrapper}>
            <div className={css.wrapper}>
              <h3 className={css.infoHeader}>General informations</h3>
              <ul className={css.generalList}>
                <li>
                  <p>
                    <strong>Category: </strong>Breakfast
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cooking time: </strong>5-7 minutes
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Caloric content: </strong>Approximately 200 kcal per
                    serving
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
              <p>
                A French omelette is known for its soft, tender texture and lack
                of browning on the outside. It’s simple but requires a bit of
                attention to achieve the perfect consistency. It’s ideal for a
                light yet satisfying breakfast.
              </p>
            </li>
            <li>
              <h2 className={css.h2}>Ingredients:</h2>
              <ul className={css.ingredientsList}>
                <li> • Eggs — 3</li>
                <li> • Butter — 1 tbsp (about 15 g)</li>
                <li> • Salt — a pinch</li>
                <li> • Black pepper — to taste</li>
                <li>
                  • Fresh herbs (parsley, dill, or green onions) — for garnish
                  (optional)
                </li>
              </ul>
            </li>
            <li>
              <h2 className={css.prepHeader}>Preparation Steps:</h2>
              <p className={css.prepText}>
                Crack the eggs into a small bowl. Add a pinch of salt and a bit
                of black pepper. Whisk the eggs with a fork or whisk until
                smooth and slightly foamy.
              </p>
              <p className={css.prepText}>
                Place a small non-stick skillet over medium heat and add the
                butter. Let the butter melt completely, being careful not to let
                it brown.
              </p>
              <p className={css.prepText}>
                Pour the beaten eggs into the skillet. Allow them to set
                slightly around the edges, then gently stir the eggs, folding
                them toward the center to keep the omelette soft and tender.
              </p>
              <p className={css.prepText}>
                Pour the beaten eggs into the skillet. Allow them to set
                slightly around the edges, then gently stir the eggs, folding
                them toward the center to keep the omelette soft and tender.
              </p>
              <p className={css.prepText}>
                When the omelette is almost set but still slightly soft in the
                center, gently lift one side with a spatula and fold it in half.
                The omelette should remain light and creamy.
              </p>
              <p>
                Transfer the omelette to a plate, sprinkle with fresh herbs if
                desired, and serve immediately while it’s warm and tender.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
