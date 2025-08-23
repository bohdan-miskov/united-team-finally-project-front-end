import { useParams, Navigate } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const fakeCount = 96;
  const { recipeType } = useParams();
  const type = recipeType?.toLowerCase();

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>My profile</h2>
      <ProfileNavigation />
      <RecipesList recipeType={type} />
      <LoadMoreBtn />
    </section>
  );
}
