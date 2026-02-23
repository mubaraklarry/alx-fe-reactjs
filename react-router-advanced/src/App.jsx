import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

// Layout
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <a href="/" className="text-xl font-bold">App</a>
          <div className="space-x-6">
            <a href="/home" className="text-blue-600">Home</a>
            <a href="/profile" className="text-blue-600">Profile</a>
            <a href="/posts/1" className="text-blue-600">Post 1</a>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}

// Pages
function Home() {
  return <h1 className="text-3xl font-bold">Home Page</h1>;
}

function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <nav className="flex space-x-8 mb-8 border-b">
        <a href="/profile/details" className="pb-2 border-b-2 border-blue-600">Details</a>
        <a href="/profile/settings" className="pb-2">Settings</a>
      </nav>
      <Outlet />
    </div>
  );
}

function ProfileDetails() {
  return <h2 className="text-2xl">Profile Details</h2>;
}

function ProfileSettings() {
  return <h2 className="text-2xl">Profile Settings</h2>;
}

function PostDetail({ id }) {
  return <h2 className="text-2xl">Post ID: {id}</h2>;
}

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="text-center py-20">
      <h2 className="text-2xl mb-6">Login Page (Demo)</h2>
      <button
        onClick={() => setLoggedIn(true)}
        className="bg-green-600 text-white px-8 py-3 rounded-lg"
      >
        Log In (simulate)
      </button>
      {loggedIn && <p className="mt-4 text-green-600">You are now logged in!</p>}
    </div>
  );
}

// Protected Route
function ProtectedRoute({ children }) {
  const isAuthenticated = true; // change to false to test protection

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />

          {/* Protected + Nested */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Dynamic route */}
          <Route path="posts/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;