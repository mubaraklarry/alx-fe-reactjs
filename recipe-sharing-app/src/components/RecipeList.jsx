import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

function RecipeList() {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  // Show all recipes when search is empty
  const recipesToShow = searchTerm === '' 
    ? useRecipeStore(state => state.recipes) 
    : filteredRecipes;

  return (
    <div>
      {recipesToShow.length === 0 ? (
        <p>
          {searchTerm 
            ? 'No recipes match your search.' 
            : 'No recipes yet. Add your first one!'}
        </p>
      ) : (
        recipesToShow.map((recipe) => (
          <div 
            key={recipe.id} 
            style={{ 
              marginBottom: '20px', 
              borderBottom: '1px solid #eee', 
              paddingBottom: '16px' 
            }}
          >
            <Link 
              to={`/recipe/${recipe.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3>{recipe.title}</h3>
            </Link>
            <p>
              {recipe.description.substring(0, 120)}
              {recipe.description.length > 120 ? '...' : ''}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;