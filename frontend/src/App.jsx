import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Book from './pages/Book';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Navbar />
     <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected routes */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
  <Route
    path="/appointments"
    element={
      <PrivateRoute>
        <Appointments />
      </PrivateRoute>
    }
  />
  <Route
    path="/book"
    element={
      <PrivateRoute>
        <Book />
      </PrivateRoute>
    }
  />
</Routes>
    </>
  );
};

export default App;
