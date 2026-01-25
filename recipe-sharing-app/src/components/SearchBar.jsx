import useRecipeStore from './recipeStore';

function SearchBar() {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by recipe title..."
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '24px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
  );
}

export default SearchBar;