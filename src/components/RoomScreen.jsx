import React, { useState } from 'react';
import LocationTracker from '../components/LocationTracker';
import { Outlet, Link } from "react-router-dom";

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [inputValue, setInputValue] = useState('');

    function addRoom() {
        setRooms(rooms => [...rooms, { id: rooms.length + 1, room: inputValue }]);
        console.log(`addRoom ${rooms.length}`);
    }

    // Filter rooms based on search
    const filteredRooms = rooms.filter(room =>
        room.room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="room-layout">
                <div>
                    <h2 className="">Rooms</h2>

                    {/* Search bar */}
                    <div className="relative mb-6">
                        <div className="">
                            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Room name..." />
                            <button onClick={() => addRoom()}>add room</button>
                        </div>
                        <input
                            type="text"
                            className=""
                            placeholder="Search rooms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Room list */}
                    <div className="">
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map((room) => (
                                <a
                                    key={room.id}
                                    onClick={() => setSelectedRoom(room)}
                                    className=""
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="">
                                        <Link to="/tracker">
                                            <span className="font-medium">{room.room}</span>
                                        </Link>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="">
                                No rooms found matching "{searchTerm}"
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <p className="">
                        Total Rooms: {rooms.length}
                    </p>
                </div>
            </div>
        </>

    );
};

export default RoomList;