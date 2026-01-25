import { useState } from 'react';
import useRecipeStore from '../recipeStore';

function AddRecipeForm() {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addRecipe({
      id: Date.now(),
      title,
      description
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        style={{ display: 'block', marginBottom: '12px', width: '100%', padding: '8px' }}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description or ingredients"
        style={{ display: 'block', marginBottom: '12px', width: '100%', padding: '8px', minHeight: '80px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;