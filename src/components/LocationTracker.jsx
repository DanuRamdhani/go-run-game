import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';


const LocationTracker = () => {
    const [isTrackingActive, setIsTrackingActive] = useState(false);
    const [startLocation, setStartLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [distance, setDistance] = useState(0);
    const [locationError, setLocationError] = useState(null);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadius * c;
    };

    const startLocationTracking = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setStartLocation(newLocation);
                setCurrentLocation(newLocation);
                setIsTrackingActive(true);
                setLocationError(null);
            },
            (error) => {
                setLocationError('Unable to retrieve your location');
            }
        );
    };

    const stopLocationTracking = () => {
        setIsTrackingActive(false);
    };

    useEffect(() => {
        let watchId;

        if (isTrackingActive && startLocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setCurrentLocation(newLocation);

                    // Calculate new distance
                    const newDistance = calculateDistance(
                        startLocation.latitude,
                        startLocation.longitude,
                        newLocation.latitude,
                        newLocation.longitude
                    );
                    setDistance(newDistance);
                },
                (error) => {
                    setLocationError('Error tracking location');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }

        // Cleanup
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [isTrackingActive, startLocation]);

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Location Distance Tracker</h2>
                </div>

                <div className="space-y-4">
                    {locationError && (
                        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
                            {locationError}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            onClick={isTrackingActive ? stopLocationTracking : startLocationTracking}
                            className={`px-4 py-2 rounded-md text-white font-medium transition-colors
                ${isTrackingActive
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                        >
                            {isTrackingActive ? 'Stop Tracking' : 'Start Tracking'}
                        </button>
                    </div>

                    {currentLocation && (
                        <div className="space-y-2 p-4 bg-gray-50 rounded-md">
                            <div className="text-sm">
                                <strong>Current Location:</strong>
                                <br />
                                Lat: {currentLocation.latitude.toFixed(6)}
                                <br />
                                Long: {currentLocation.longitude.toFixed(6)}
                            </div>

                            <div className="text-lg font-semibold text-blue-600">
                                Distance: {distance.toFixed(2)} km
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationTracker;