import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Welcome to FortSpring
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure, elegant, and modular authentication system built with Spring Boot and React
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">JWT Authentication</h3>
            <p className="text-gray-600 text-sm">Secure token-based authentication system</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 text-sm">Complete profile and account management</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-600 text-sm">Flexible role management system</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:from-green-700 hover:to-green-600 transition shadow-lg hover:shadow-xl"
            >
              View Profile
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-green-600 hover:text-green-600 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}