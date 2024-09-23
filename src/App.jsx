import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import CreateRidePage from './pages/CreateRidePage';
import RideDetailsPage from './pages/RideDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create" element={<CreateRidePage />} />
        <Route path="/ride/:id" element={<RideDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
