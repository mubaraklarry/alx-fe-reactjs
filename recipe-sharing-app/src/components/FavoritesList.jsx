import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

function FavoritesList() {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => state.recipes.find(r => r.id === id)).filter(Boolean)
  );

  return (
    <div style={{ marginTop: '32px' }}>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite recipes yet.</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id} style={{ marginBottom: '16px' }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description.substring(0, 80)}...</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;