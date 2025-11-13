import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChallengeForm = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        duration: "",
        target: "",
        participants: 0,
        impactMetric: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const challengeData = { ...formData, createdBy: user?.email };

            const res = await axios.post('http://localhost:3000/challenges', challengeData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.status === 200 || res.status === 201) {
                toast.success('Challenge created successfully!');

                setFormData({
                    title: "",
                    category: "",
                    description: "",
                    duration: "",
                    target: "",
                    participants: 0,
                    impactMetric: "",
                    startDate: "",
                    endDate: "",
                    imageUrl: "",
                });
            } else {
                toast.error('Failed to create challenge.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating challenge.');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-6 md:mx-auto my-10 py-8 px-4 md:px-8 md:py-12 bg-white rounded-md shadow-md">
            <div className="max-w-6xl mx-auto text-center mb-15">
                <h2 className="text-3xl md:text-4xl font-bold text-accent">Create a New Challenge</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                        placeholder="Challenge Title"
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                        placeholder="e.g. Sustainable Fashion"
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                        placeholder="Describe the challenge"
                        required
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-1'>
                        <label className="font-bold text-primary">Duration (days)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="font-bold text-primary">Target</label>
                        <input
                            type="text"
                            name="target"
                            value={formData.target}
                            onChange={handleChange}
                            className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                            placeholder="Reduce textile waste..."
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Impact Metric</label>
                    <input
                        type="text"
                        name="impactMetric"
                        value={formData.impactMetric}
                        onChange={handleChange}
                        className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                        placeholder="e.g. kg clothing waste avoided"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-1'>
                        <label className="font-bold text-primary">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="font-bold text-primary">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full border-2 px-3 py-2 rounded outline-0 border-gray-300 font-semibold"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-bold text-primary">Created By (Your Email)</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        className="w-full border-2 px-3 py-2 rounded bg-gray-100 cursor-not-allowed outline-0 border-gray-300 font-semibold"
                        readOnly
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-2 rounded hover:opacity-85 cursor-pointer duration-300"
                    disabled={loading}
                >
                    {loading ? 'Creating Challenge...' : 'Create Challenge'}
                </button>
            </form>
        </div>
    );
};

export default ChallengeForm;

