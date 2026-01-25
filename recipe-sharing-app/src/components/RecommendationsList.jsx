import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

function RecommendationsList() {
  const recommendations = useRecipeStore(state => state.recommendations);

  return (
    <div style={{ marginTop: '32px' }}>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>Add some favorites to see recommendations.</p>
      ) : (
        recommendations.map(recipe => (
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

export default RecommendationsList;