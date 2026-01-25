import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Delete this recipe?')) {
      deleteRecipe(id);
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer'
      }}
    >
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;