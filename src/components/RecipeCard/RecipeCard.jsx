export default function RecipeCard({ recipe, recipeType }) {
  const { id, title, description, time, calories, image, isFavorite } = recipe;

  const handleFavoriteClick = () => {
    if (recipeType === "favorites") {
      console.log("Видаляємо з улюблених:", id);
    } else {
      console.log("Додаємо/знімаємо улюблене:", id);
    }
  };

  return (
    <div className="recipe-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{time} min</span>
      <span>{calories || "—"}</span>

      <button>Learn More</button>

      <button onClick={handleFavoriteClick}>
        {recipeType === "favorites" ? "Remove" : isFavorite ? "Unsave" : "Save"}
      </button>
    </div>
  );
  return;
}
