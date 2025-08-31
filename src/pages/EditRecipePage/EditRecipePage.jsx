import { useParams } from 'react-router-dom';
import css from './EditRecipePage.module.css';
import AddEditRecipeForm from '../../components/AddEditRecipeForm/AddEditRecipeForm';

export default function EditRecipePage() {
  const { id } = useParams(); // отримуємо id з URL
  return (
    <section className={css.editFormSection}>
      <div className="container">
        <h1 className={css.title}>Edit Recipe</h1> <AddEditRecipeForm id={id} />
      </div>
    </section>
  );
}
