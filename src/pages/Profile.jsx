import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, logoutUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import axios from 'axios';
import api from '../api'

const Profile = () => {
  const { user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showUpdate, setShowUpdate] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!user) dispatch(fetchProfile());
  }, [user, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out!');
    navigate('/login');
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await api.post('/auth/update-password', { oldPassword, newPassword }, { withCredentials: true });
      toast.success('Password updated!');
      setShowUpdate(false);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating password');
    }
    setUpdateLoading(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return <div className="p-8 text-center">Not logged in</div>;

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <button
        onClick={() => setShowUpdate(!showUpdate)}
        className="mt-4 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showUpdate ? 'Cancel' : 'Update Password'}
      </button>
      {showUpdate && (
        <form onSubmit={handleUpdatePassword} className="mt-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className="block w-full mb-2 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="block w-full mb-2 px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={updateLoading}
          >
            {updateLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;