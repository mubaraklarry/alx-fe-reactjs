// ... existing imports ...
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import SearchBar from './components/SearchBar';

function App() {
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Generate recommendations when home loads
  useEffect(() => {
    generateRecommendations();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px' }}>
        <h1>Recipe Sharing App</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;