import { useParams } from 'react-router-dom';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';

export default function EditRecipePage() {
  const { id } = useParams();
  console.log('EditRecipePage id:', id); // отримуємо id з URL
  return <AddRecipeForm id={id} />;
}
