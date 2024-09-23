import React from 'react';
import RideList from '../components/RideList';
import Navbar from '../components/Navbar';
import CreateRide from '../components/CreateRide';

const SearchPage = () => {
    return (
        <div>
            <CreateRide />
            {/* <RideList /> */}
            <Navbar />
        </div>
    );
};

export default SearchPage;
