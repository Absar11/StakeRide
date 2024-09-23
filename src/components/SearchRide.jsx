import React, { useEffect, useState } from 'react';
import { FaSearchLocation, FaMapMarkerAlt, FaCalendarAlt, FaPlus, FaMinus } from 'react-icons/fa';

function SearchRide() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [date, setDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    // Get user's current location when the page loads
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPickupLocation(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
        });
    }, []);

    return (
        <div className="p-4 h-screen w-screen flex flex-col items-center">
            <div className="h-1/3 w-full bg-gray-200 flex justify-center items-center">
                {/* Placeholder for Google Map */}
                <p>Map Placeholder</p>
            </div>

            <h1 className="text-lg font-bold my-2">Search your ride</h1>
            <p className="text-sm text-gray-500">Your location data will be kept confidential</p>

            <div className="w-full max-w-md mt-4 space-y-4">
                {/* Pickup location */}
                <div className="flex items-center border p-2 rounded-md bg-white shadow-md">
                    <FaSearchLocation className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        value={pickupLocation}
                        placeholder="Pickup location"
                        className="w-full outline-none"
                        readOnly
                    />
                </div>

                {/* Drop location */}
                <div className="flex items-center border p-2 rounded-md bg-white shadow-md">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        value={dropLocation}
                        placeholder="Drop location"
                        className="w-full outline-none"
                        onChange={(e) => setDropLocation(e.target.value)}
                    />
                </div>

                {/* Date selection */}
                <div className="flex items-center border p-2 rounded-md bg-white shadow-md">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full outline-none"
                    />
                </div>

                {/* Passenger count */}
                <div className="flex items-center border p-2 rounded-md bg-white shadow-md justify-between">
                    <button
                        className="p-2"
                        onClick={() => setPassengers(passengers > 1 ? passengers - 1 : 1)}
                    >
                        <FaMinus />
                    </button>
                    <span>{passengers}</span>
                    <button className="p-2" onClick={() => setPassengers(passengers + 1)}>
                        <FaPlus />
                    </button>
                </div>

                <button className="w-full bg-black text-white py-2 rounded-md mt-4 flex items-center justify-center">
                    <span>Find ride</span>
                    <FaSearchLocation className="ml-2" />
                </button>
            </div>
        </div>
    );
}

export default SearchRide;
