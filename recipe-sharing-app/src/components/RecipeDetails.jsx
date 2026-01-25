// ... existing imports ...
import useRecipeStore from './recipeStore';

function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId));
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  if (!recipe) return <div>Recipe not found</div>;

  const isFavorite = favorites.includes(recipeId);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'block', marginBottom: '16px' }}>← Back</Link>
      
      <h1>{recipe.title}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.description}</p>

      <button 
        onClick={() => isFavorite ? removeFavorite(recipeId) : addFavorite(recipeId)}
        style={{ 
          backgroundColor: isFavorite ? '#28a745' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          margin: '16px 0'
        }}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <h3>Edit Recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <DeleteRecipeButton id={recipe.id} />
    </div>
  );
}

export default RecipeDetails;