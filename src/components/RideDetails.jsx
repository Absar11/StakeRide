import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RideDetails = () => {
    const { id } = useParams();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        axios.get(`/api/rides/${id}`)
            .then(response => setRide(response.data))
            .catch(error => console.error('Error fetching ride details:', error));
    }, [id]);

    if (!ride) return <p className="text-center">Loading...</p>;

    return (
        <div className="px-4 py-8">
            <h2 className="text-xl font-bold mb-4">Ride Details</h2>
            <p><strong>Pickup Location:</strong> {ride.pickup}</p>
            <p><strong>Destination:</strong> {ride.destination}</p>
            <p><strong>Time:</strong> {new Date(ride.time).toLocaleString()}</p>
            <p><strong>Price:</strong> {ride.price} CKETH</p>
            <p><strong>Capacity:</strong> {ride.capacity} passengers</p>
            <button className="mt-4 bg-black text-white py-2 px-4 rounded-md">Request to Book</button>
        </div>
    );
};

export default RideDetails;
