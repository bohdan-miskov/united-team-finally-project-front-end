import { useParams, Navigate } from 'react-router-dom';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import styles from './ProfilePage.module.css';
import Filters from '../../components/Filters/Filters.jsx';

export default function ProfilePage() {
  const { recipeType } = useParams();
  const type = recipeType?.toLowerCase();

  return (
    <section className={styles.page}>
      <div className="container">
        <h2 className={styles.title}>My profile</h2>
        <ProfileNavigation />
        <Filters recipeType={type} />
        <RecipesList recipeType={type} />
        <LoadMoreBtn />
      </div>
    </section>
  );
}
