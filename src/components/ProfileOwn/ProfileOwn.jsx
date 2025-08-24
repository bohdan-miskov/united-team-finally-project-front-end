import RecipesList from '../RecipesList/RecipesList';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function ProfileOwn() {
  <div className="profile-own">
    <RecipesList recipeType="own" />
    <LoadMoreBtn />
  </div>;
}
