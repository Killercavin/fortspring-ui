import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/AxiosClient";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: string | null;
  createdAt: string;
  [key: string]: unknown;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axiosClient.get("/profile")
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching profile. Please login again.");
        setLoading(false);
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/login");
        }, 2000);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-green-600 to-green-800" />
          
          {/* Profile Content */}
          <div className="px-8 py-6 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-green-600 shadow-lg border-4 border-white">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>

            {/* Edit Button */}
            <div className="text-right mb-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* User Info */}
            <div className="mt-16">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pb-8 border-b border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {user.role || 'User'}
                </div>
                <div className="text-sm text-gray-600">Role</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Active</div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.firstName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user.lastName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Role
                  </label>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-green-800">
                    {user.role || 'USER'}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Member Since
                  </label>
                  <p className="text-gray-900 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Save Button (shown when editing) */}
              {isEditing && (
                <div className="flex gap-4 pt-6">
                  <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-500 transition">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Security Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
                <span className="text-gray-700">Change Password</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-between">
                <span className="text-gray-700">Two-Factor Authentication</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Logged in</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Profile viewed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}