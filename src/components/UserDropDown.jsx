import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const UserDropDown = ({ user, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="relative" ref={dropdownRef}>
                <div onClick={() => setOpen(!open)} className="flex justify-center items-center gap-2 cursor-pointer animate-pulse">
                    <img className="h-8 w-8 rounded-full border-2" src={user.photoURL} alt="" />
                    <h3 className="text-lg font-bold">Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}!</h3>
                </div>
                {
                    open &&
                    <div className="absolute right-0 mt-3 w-50 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <ul className="flex flex-col">
                            <li className="px-4 py-4 text-lg font-semibold hover:bg-gray-100 border-b-2 border-primary">
                                <Link to="/my-profile" onClick={() => setOpen(false)}>My Profile</Link>
                            </li>
                            <li className="px-4 py-3 text-lg font-semibold  hover:bg-gray-100 border-b-2 border-primary">
                                <Link to="/my-activities" onClick={() => setOpen(false)}>My Activities</Link>
                            </li>
                            <li className="px-4 py-3 text-lg font-semibold hover:bg-gray-100">
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setOpen(false);
                                    }}
                                    className="w-full text-left cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserDropDown;