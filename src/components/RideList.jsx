import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RideCard from './RideCard';

const RideList = () => {
    const [rides, setRides] = useState([]); // Initialize rides as an array
    const [error, setError] = useState(null); // Add error state for better debugging

    useEffect(() => {
        axios.get('/api/rides')
            .then(response => {
                const rideData = Array.isArray(response.data) ? response.data : []; // Ensure response is an array
                setRides(rideData);
            })
            .catch(error => {
                console.error('Error fetching rides:', error);
                setError('Failed to fetch rides');
            });
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message if there's an issue
    }

    return (
        <div className="px-4 pt-8 pb-20">
            {rides.length > 0 ? (
                rides.map(ride => (
                    <RideCard key={ride._id} ride={ride} />
                ))
            ) : (
                <p>No rides available</p>
            )}
        </div>
    );
};

export default RideList;
