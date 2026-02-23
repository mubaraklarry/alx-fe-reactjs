import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      
      <nav className="flex space-x-8 mb-8 border-b pb-2">
        <a href="/profile/details" className="font-medium">Details</a>
        <a href="/profile/settings" className="font-medium">Settings</a>
      </nav>

      <Outlet />
    </div>
  );
}

export default Profile;