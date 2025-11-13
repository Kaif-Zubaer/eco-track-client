import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfilePage = () => {
    const { user, userUpdate, passwordUpdate } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Store original values to restore on cancel
    const [originalName, setOriginalName] = useState(user?.displayName || '');
    const [originalPhotoURL, setOriginalPhotoURL] = useState(user?.photoURL || '');

    useEffect(() => {
        // Update original values if user changes (after login or fetch)
        setName(user?.displayName || '');
        setPhotoURL(user?.photoURL || '');
        setOriginalName(user?.displayName || '');
        setOriginalPhotoURL(user?.photoURL || '');
    }, [user]);

    const validatePassword = (pwd, confirmPwd) => {
        if (!pwd) return true;
        if (pwd.length < 6) {
            toast.error('Password must be at least 6 characters!');
            return false;
        }
        if (pwd !== confirmPwd) {
            toast.error('Passwords do not match!');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validatePassword(password, confirmPassword)) return;

        try {
            await userUpdate({ displayName: name, photoURL });
            if (password) await passwordUpdate(password);
            toast.success('Profile updated successfully!');
            // Update original values
            setOriginalName(name);
            setOriginalPhotoURL(photoURL);
            setEditMode(false);
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleCancel = () => {
        // Restore original values
        setName(originalName);
        setPhotoURL(originalPhotoURL);
        setPassword('');
        setConfirmPassword('');
        setEditMode(false);
    };

    return (
        <div className="py-20 flex items-center justify-center bg-gray-100 p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={photoURL || 'https://via.placeholder.com/120'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
                    />
                    {editMode && (
                        <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Photo URL"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                        />
                    )}
                </div>

                <div className="text-center mb-4">
                    {editMode ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                        />
                    ) : (
                        <h2 className="text-xl font-semibold text-gray-800">{name || 'Your Name'}</h2>
                    )}
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                {editMode && (
                    <div className="mb-4 space-y-2">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                )}

                <div className="flex justify-between">
                    <button
                        onClick={editMode ? handleSave : () => setEditMode(true)}
                        className="flex-1 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                    >
                        {editMode ? 'Save' : 'Edit'}
                    </button>
                    {editMode && (
                        <button
                            onClick={handleCancel}
                            className="ml-2 flex-1 py-2 rounded bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;




