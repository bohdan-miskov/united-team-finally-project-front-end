import css from './IngredientsListModal.module.css';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';

export default function IngredientsListModal({ recipe }) {
  const [servings, setServings] = useState(1);

  const scaledIngredients = useMemo(() => {
    return recipe.ingredients.map((ing) => {
      if (ing.unit === undefined || ing.unit === null) {
        const [q, ...rest] = (ing.measure || '').split(' ');
        return {
          name: ing.name,
          quantity: ((parseFloat(q) || 0) * servings).toFixed(2),
          unit: rest.join(' '),
        };
      } else {
        return {
          name: ing.name,
          quantity: ((parseFloat(ing.measure) || 0) * servings).toFixed(2),
          unit: ing.unit || '',
        };
      }
    });
  }, [recipe.ingredients, servings]);

  const toastOptions = {
    duration: 4000,
    style: {
      background: '#1e1e2f',
      color: '#fff',
      border: '1px solid #22c55e',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
    },
    iconTheme: {
      primary: '#22c55e',
      secondary: '#fff',
    },
  };

  const copyToClipboard = () => {
    const text = scaledIngredients
      .map((ing) => `${ing.name} — ${ing.quantity} ${ing.unit}`)
      .join('\n');

    navigator.clipboard.writeText(text)
      .then(() => toast.success('Ingredients copied to clipboard!', toastOptions))
      .catch(() => toast.error('Failed to copy to clipboard', toastOptions));
  };

  const downloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      scaledIngredients
        .map((ing) => `${ing.name},${ing.quantity},${ing.unit}`)
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${recipe.title}-ingredients.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV file successfully downloaded!', toastOptions);
  };

  return (
    <div className={css.modalContent}>
      <h2>{recipe.title} — Ingredients</h2>

      <div className={css.servingsSelector}>
        <label>Servings: </label>
        <input
          type="number"
          min={1}
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
        />
      </div>

      <table className={css.ingredientsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {scaledIngredients.map((ing, idx) => (
            <tr key={idx}>
              <td>{ing.name}</td>
              <td>{ing.quantity}</td>
              <td>{ing.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.actions}>
        <button onClick={copyToClipboard}>Copy to clipboard</button>
        <button onClick={downloadCSV}>Download CSV</button>
      </div>
    </div>
  );
}