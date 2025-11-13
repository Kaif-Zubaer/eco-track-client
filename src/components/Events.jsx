import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import Loading from './Loading';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/events')
            .then(data => {
                setEvents(data.data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <section className="bg-[#f5faf7] py-12 px-4 md:px-8 xl:px-25">
                <div className="max-w-6xl mx-auto text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-accent  mb-3">Upcoming Events</h2>
                    <p className="text-gray-600">Join upcoming community activities and make a positive environmental impact.</p>
                </div>
                {
                    loading
                        ? <Loading></Loading>
                        : events.length > 0
                            ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        events.map((event) => (
                                            <div key={event._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                                                </div>
                                                <div className="text-sm text-gray-500 space-y-1 mt-auto">
                                                    <p className="flex items-center gap-2">
                                                        <FaCalendarAlt className="text-primary" />
                                                        {
                                                            new Date(event.date).toLocaleDateString("en-GB", {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                        }
                                                    </p>
                                                    <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {event.location}</p>
                                                    <p className="flex items-center gap-2"><FaUsers className="text-primary" /> {event.currentParticipants}/{event.maxParticipants} participants</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )
                            : <p className="text-center text-gray-500 mt-10 text-3xl font-bold">No upcoming events found.</p>
                }
            </section>
        </div>
    );
};

export default Events;