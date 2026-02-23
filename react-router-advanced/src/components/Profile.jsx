import { Routes, Route, Outlet } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>

      <nav className="flex space-x-10 mb-10 border-b pb-4">
        <a href="/profile/details" className="font-medium text-lg">Details</a>
        <a href="/profile/settings" className="font-medium text-lg">Settings</a>
      </nav>

      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      <Outlet />
    </div>
  );
}

export default Profile;