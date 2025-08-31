import css from './AddRecipePage.module.css';
import AddEditRecipeForm from '../../components/AddEditRecipeForm/AddEditRecipeForm';

export default function AddRecipePage() {
  return (
    <section className={css.addFormSection}>
      <div className="container">
        <h1 className={css.title}>Add Recipe</h1>
        <AddEditRecipeForm />
      </div>
    </section>
  );
}
