import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'block', marginBottom: '16px' }}>
        ← Back to list
      </Link>

      <h1>{recipe.title}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</p>

      <h3>Edit Recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
}

export default RecipeDetails;