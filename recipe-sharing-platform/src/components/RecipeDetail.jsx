import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = recipesData.find(r => r.id === Number(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-xl">Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{recipe.title}</h1>
          <p className="text-xl text-gray-700 mb-10">{recipe.summary}</p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Ingredients</h2>
          <ul className="list-disc pl-8 mb-12 space-y-3 text-gray-700 text-lg">
            <li>Ingredient example 1</li>
            <li>Ingredient example 2</li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Instructions</h2>
          <ol className="list-decimal pl-8 space-y-4 text-gray-700 text-lg">
            <li>First step of preparation.</li>
            <li>Second step of cooking.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;