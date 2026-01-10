import WelcomeMessage from './components/WelcomeMessage';  // ← Add this line

function App() {
  return (
    <>
      <WelcomeMessage />   {/* ← Add this line */}
      
      {/* You can keep or remove the original content */}
      <h1>Vite + React</h1>
      {/* ... rest of the default content ... */}
    </>
  );
}

export default App;