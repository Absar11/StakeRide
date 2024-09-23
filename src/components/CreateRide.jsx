import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FaSearchLocation, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const CreateRide = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(new Date());
    const [capacity, setCapacity] = useState(1); // Default to 1 person
    const [position, setPosition] = useState(null);

    // Function to fetch address using Nominatim (OpenStreetMap)
    const fetchAddressFromCoords = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            setPickup(response.data.display_name); // Set address as pickup location
        } catch (error) {
            console.error('Error fetching geolocation:', error);
        }
    };

    // Get user's current location on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
                fetchAddressFromCoords(latitude, longitude);
            });
        }
    }, []);

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                fetchAddressFromCoords(e.latlng.lat, e.latlng.lng); // Fetch address for clicked location
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        return position === null ? null : <Marker position={position} />;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rideData = {
            pickup,
            destination,
            time: date.toISOString(),
            capacity: parseInt(capacity, 10),
        };

        // Send the rideData to your backend here
        console.log(rideData);
        alert('Ride created successfully!');
    };

    return (
        <div className="px-4 py-8 max-w-md mx-auto">
            {position && (
                <div className="mb-6">
                    <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Search your ride</h2>
            <p className="text-gray-500 mb-4 text-sm">Your location data will be kept confidential</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <FaSearchLocation className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        className="border border-gray-300 pl-10 p-3 w-full rounded-md"
                        placeholder="Pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        className="border border-gray-300 pl-10 p-3 w-full rounded-md"
                        placeholder="Drop location"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>

                <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <DatePicker
                        selected={date}
                        onChange={setDate}
                        showTimeSelect
                        dateFormat="Pp"
                        className="border border-gray-300 pl-10 p-3 w-full rounded-md"
                        required
                    />
                </div>

                <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="number"
                        min="1"
                        max="10"
                        className="border border-gray-300 pl-10 p-3 w-full rounded-md"
                        placeholder="1"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-black text-white py-3 px-4 rounded-md w-full flex justify-center items-center"
                >
                    <span>Find ride</span>
                    <span className="ml-2">→</span>
                </button>
            </form>
        </div>
    );
};

export default CreateRide;
