import { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingList = ingredients.split('\n').filter(item => item.trim());
      if (ingList.length < 2) {
        newErrors.ingredients = 'At least 2 ingredients required';
      }
    }

    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newRecipe = {
        id: Date.now(),
        title: title.trim(),
        summary: 'New recipe added by user',
        ingredients: ingredients.split('\n').filter(item => item.trim()),
        instructions: steps.split('\n').filter(item => item.trim()),
      };

      console.log('New recipe submitted:', newRecipe);

      // Reset form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Add New Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Classic Pancakes"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              rows="6"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="2 cups flour&#10;1 cup milk&#10;2 eggs"
            />
            {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
          </div>

          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Steps (one per line)
            </label>
            <textarea
              id="steps"
              rows="8"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.steps ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1. Mix dry ingredients&#10;2. Add wet ingredients&#10;3. Cook on medium heat"
            />
            {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;