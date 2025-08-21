import { useMemo, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";

export default function RecipesList({ recipeType }) {

  const mockRecipes = [
    { id: 1,  title: "Classic French Omelette", description: "A soft, creamy classic with butter and eggs.", time: 10, calories: "~150 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 2,  title: "Pasta Carbonara",        description: "Classic Italian dish with bacon, cheese, and eggs.",   time: 20, calories: "~350 cals", image: "https://via.placeholder.com/200", isFavorite: true  },
    { id: 3,  title: "Greek Salad",            description: "Fresh and healthy salad with feta and olives.",        time: 15, calories: "~180 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 4,  title: "Chicken Curry",          description: "Spicy Indian-style curry with tender chicken pieces.", time: 40, calories: "~450 cals", image: "https://via.placeholder.com/200", isFavorite: true  },
    { id: 5,  title: "Beef Stroganoff",        description: "Creamy Russian dish with beef and mushrooms.",         time: 35, calories: "~500 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 6,  title: "Caesar Salad",           description: "Romaine, croutons, parmesan, Caesar dressing.",        time: 12, calories: "~220 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 7,  title: "Margherita Pizza",       description: "Classic pizza with mozzarella and basil.",             time: 25, calories: "~600 cals", image: "https://via.placeholder.com/200", isFavorite: true  },
    { id: 8,  title: "Tomato Soup",            description: "Smooth and creamy soup from fresh tomatoes.",          time: 30, calories: "~150 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 9,  title: "Grilled Salmon",         description: "Salmon fillet with lemon and herbs.",                  time: 20, calories: "~320 cals", image: "https://via.placeholder.com/200", isFavorite: true  },
    { id: 10, title: "Vegetable Stir Fry",     description: "Quick stir fry with fresh vegetables.",                time: 15, calories: "~200 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 11, title: "Pancakes",               description: "Fluffy pancakes with maple syrup.",                    time: 20, calories: "~400 cals", image: "https://via.placeholder.com/200", isFavorite: false },
    { id: 12, title: "Tacos",                  description: "Mexican tacos with beef, cheese, and salsa.",          time: 18, calories: "~350 cals", image: "https://via.placeholder.com/200", isFavorite: true  },
  ];

  const all = useMemo(() => (
    recipeType === "favorites"
      ? mockRecipes.filter(r => r.isFavorite)
      : mockRecipes
  ), [recipeType]);

  const PAGE_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = all.slice(0, visibleCount);
  const hasMore = visibleCount < all.length;

  const handleLoadMore = () => setVisibleCount(c => Math.min(c + PAGE_SIZE, all.length));

  const handleToggleFavorite = (id) => {
    if (recipeType === "favorites") {
      console.log("Видаляємо з улюблених:", id);
    } else {
      console.log("Тогл улюбленого (own):", id);
    }
  };

  return (
    <div className="recipes-list">
      {visible.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          recipeType={recipeType}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
}

