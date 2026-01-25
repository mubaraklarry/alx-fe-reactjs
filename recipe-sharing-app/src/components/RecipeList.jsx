import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description.substring(0, 120)}{recipe.description.length > 120 ? '...' : ''}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;