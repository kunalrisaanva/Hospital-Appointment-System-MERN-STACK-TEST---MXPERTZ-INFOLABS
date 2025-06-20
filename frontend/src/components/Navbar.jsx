import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Hospital System
      </div>

      <div className="space-x-6">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/appointments" className="hover:underline">Appointments</Link>
            <Link to="/book" className="hover:underline">Book Appointment</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
