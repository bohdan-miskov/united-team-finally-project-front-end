import RecipesList from '../RecipesList/RecipesList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function ProfileFavorites() {
  <div className="profile-favorites">
    <RecipesList recipeType="favorites" />
    <LoadMoreBtn />
  </div>;
}
