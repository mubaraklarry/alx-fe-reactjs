import { create } from 'zustand';

const STORAGE_KEY = 'recipes';

const useRecipeStore = create((set, get) => {
  // Load saved recipes from localStorage when store is created
  const saved = localStorage.getItem(STORAGE_KEY);
  const initialRecipes = saved ? JSON.parse(saved) : [];

  return {
    recipes: initialRecipes,
    searchTerm: '',
    filteredRecipes: initialRecipes,

    // Add new recipe + save
    addRecipe: (newRecipe) => {
      set((state) => {
        const updatedRecipes = [...state.recipes, newRecipe];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
        return {
          recipes: updatedRecipes,
          filteredRecipes: state.searchTerm
            ? updatedRecipes.filter(r =>
                r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
              )
            : updatedRecipes
        };
      });
    },

    // Update recipe + save
    updateRecipe: (id, updatedFields) => {
      set((state) => {
        const updatedRecipes = state.recipes.map((r) =>
          r.id === id ? { ...r, ...updatedFields } : r
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
        return {
          recipes: updatedRecipes,
          filteredRecipes: state.searchTerm
            ? updatedRecipes.filter(r =>
                r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
              )
            : updatedRecipes
        };
      });
    },

    // Delete recipe + save
    deleteRecipe: (id) => {
      set((state) => {
        const updatedRecipes = state.recipes.filter((r) => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
        return {
          recipes: updatedRecipes,
          filteredRecipes: state.searchTerm
            ? updatedRecipes.filter(r =>
                r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
              )
            : updatedRecipes
        };
      });
    },

    // Set search term + filter immediately
    setSearchTerm: (term) => {
      set((state) => {
        const lowerTerm = term.toLowerCase();
        const filtered = state.recipes.filter((r) =>
          r.title.toLowerCase().includes(lowerTerm)
        );
        return {
          searchTerm: term,
          filteredRecipes: term.trim() === '' ? state.recipes : filtered
        };
      });
    },

    // Optional: clear all data (for testing)
    clearRecipes: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({
        recipes: [],
        filteredRecipes: [],
        searchTerm: ''
      });
    }
  };
});

export default useRecipeStore;