import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0">
      <div className="flex justify-around">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/stepCount">Step Count</Link>
      </div>
    </nav>
  );
};

export default Navbar;