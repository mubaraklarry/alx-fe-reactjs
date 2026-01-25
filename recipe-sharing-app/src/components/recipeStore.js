import { create } from 'zustand';

const STORAGE_KEY = 'recipes';
const FAVORITES_KEY = 'favorites';

const useRecipeStore = create((set, get) => {
  // Load from localStorage
  const savedRecipes = localStorage.getItem(STORAGE_KEY);
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);
  const initialRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  return {
    recipes: initialRecipes,
    favorites: initialFavorites,
    searchTerm: '',
    filteredRecipes: initialRecipes,
    recommendations: [],

    addRecipe: (newRecipe) => {
      set((state) => {
        const updated = [...state.recipes, newRecipe];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return { recipes: updated, filteredRecipes: updated };
      });
    },

    updateRecipe: (id, updatedFields) => {
      set((state) => {
        const updated = state.recipes.map(r => r.id === id ? { ...r, ...updatedFields } : r);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return { recipes: updated, filteredRecipes: updated };
      });
    },

    deleteRecipe: (id) => {
      set((state) => {
        const updated = state.recipes.filter(r => r.id !== id);
        const updatedFavorites = state.favorites.filter(favId => favId !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        return { 
          recipes: updated, 
          favorites: updatedFavorites,
          filteredRecipes: updated 
        };
      });
    },

    setSearchTerm: (term) => {
      set((state) => {
        const lower = term.toLowerCase();
        const filtered = state.recipes.filter(r => r.title.toLowerCase().includes(lower));
        return {
          searchTerm: term,
          filteredRecipes: term.trim() === '' ? state.recipes : filtered
        };
      });
    },

    addFavorite: (recipeId) => {
      set((state) => {
        if (state.favorites.includes(recipeId)) return state;
        const updated = [...state.favorites, recipeId];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        return { favorites: updated };
      });
    },

    removeFavorite: (recipeId) => {
      set((state) => {
        const updated = state.favorites.filter(id => id !== recipeId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        return { favorites: updated };
      });
    },

    generateRecommendations: () => {
      set((state) => {
        // Simple logic: show non-favorite recipes (you can improve later)
        const recommended = state.recipes
          .filter(r => !state.favorites.includes(r.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        return { recommendations: recommended };
      });
    }
  };
});

export default useRecipeStore;