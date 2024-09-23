import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaCar, FaInbox, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="fixed bottom-0 w-full bg-gray-100 shadow-inner py-3 flex justify-around z-50">
            <Link to="/search" className="text-gray-800 text-xl"><FaSearch /></Link>
            <Link to="/create" className="text-gray-800 text-xl"><FaPlus /></Link>
            <Link to="/rides" className="text-gray-800 text-xl"><FaCar /></Link>
            <Link to="/inbox" className="text-gray-800 text-xl"><FaInbox /></Link>
            <Link to="/profile" className="text-gray-800 text-xl"><FaUser /></Link>
        </nav>
    );
};

export default Navbar;
