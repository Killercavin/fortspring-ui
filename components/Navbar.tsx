import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold text-lg">FortSpring UI</h1>
      <div className="space-x-4">
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
      </div>
    </nav>
  );
}