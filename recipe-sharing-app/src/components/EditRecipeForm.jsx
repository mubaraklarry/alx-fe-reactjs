import { useState } from 'react';
import useRecipeStore from './recipeStore';

function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(recipe.id, { title, description });
    alert('Recipe updated');
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '16px 0' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '8px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: 'block', width: '100%', minHeight: '100px', marginBottom: '12px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Save Changes
      </button>
    </form>
  );
}

export default EditRecipeForm;