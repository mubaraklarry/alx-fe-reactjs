import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipesData.find(r => r.id === Number(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {recipe.summary}
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ingredient 1 (example)</li>
              <li>Ingredient 2 (example)</li>
              <li>Ingredient 3 (example)</li>
              {/* Add real ingredients when data is updated */}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cooking Instructions
            </h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>Step 1: Prepare ingredients.</li>
              <li>Step 2: Cook pasta al dente.</li>
              <li>Step 3: Mix sauce and serve hot.</li>
              {/* Add real steps when data is updated */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;