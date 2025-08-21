import { useParams, Navigate } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { recipeType } = useParams();
  const type = recipeType?.toLowerCase();

  const allowed = new Set(['own', 'favorites']);
  if (!type || !allowed.has(type)) {
    return <Navigate to="/profile/own" replace />;
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>My profile</h1>
      <ProfileNavigation />
      <RecipesList recipeType={type} />
      <LoadMoreBtn />
    </section>
  );
}
