import { useEffect, useState } from "react";
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

  useEffect(() => {
    axiosClient.get("/profile")
      .then(res => setUser(res.data))
      .catch(() => alert("Error fetching profile"));
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {user.firstName} {user.lastName}
        </h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p className="text-sm text-gray-500 mt-2">
          Joined: {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
