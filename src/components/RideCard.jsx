import React from 'react';
import { Link } from 'react-router-dom';

const RideCard = ({ ride }) => {
    return (
        <div className="border p-4 mb-4 rounded-md bg-white shadow-sm">
            <h3 className="text-lg font-semibold">{ride.pickup} to {ride.destination}</h3>
            <p className="text-gray-600">Time: {new Date(ride.time).toLocaleString()}</p>
            <p className="text-gray-600">Price: {ride.price} CKETH</p>
            <p className="text-gray-600">Capacity: {ride.capacity} passengers</p>
            <Link to={`/ride/${ride._id}`} className="text-blue-600 hover:underline">View Details</Link>
        </div>
    );
};

export default RideCard;
