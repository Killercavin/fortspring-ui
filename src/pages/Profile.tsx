import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../api/AxiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login first.", { autoClose: 3000 });
      navigate("/auth/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const status = err.response.status;
            switch (status) {
              case 401:
                toast.error("Unauthorized. Please login again.", { autoClose: 5000 });
                break;
              case 404:
                toast.error("Profile not found.", { autoClose: 5000 });
                break;
              case 500:
                toast.error("Server error. Try again later.", { autoClose: 5000 });
                break;
              default:
                toast.error(err.response.data?.message || "Failed to fetch profile.", { autoClose: 5000 });
            }
          } else if (err.request) {
            toast.error("No response from server. Check your network.", { autoClose: 5000 });
          } else {
            toast.error(err.message, { autoClose: 5000 });
          }
        } else {
          toast.error("An unexpected error occurred.", { autoClose: 5000 });
        }
        localStorage.removeItem("token");
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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

  if (!user) return null;

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-600 to-green-800" />
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
                <h1 className="text-3xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-600 mt-1">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" newestOnTop />
    </>
  );
}
