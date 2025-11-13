import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaUsers, FaLeaf, FaClock } from "react-icons/fa";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { BiCategory } from "react-icons/bi";

const MyActivities = () => {
    const { user } = useContext(AuthContext);
    const [createdChallenges, setCreatedChallenges] = useState([]);
    const [joinedChallenges, setJoinedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const createdRes = await axios.get(
                    `http://localhost:3000/challenges?email=${user.email}`
                );
                setCreatedChallenges(createdRes.data);

                const joinedRes = await axios.get(
                    `http://localhost:3000/user_challenges?email=${user.email}`
                );
                const joined = joinedRes.data;

                const joinedWithDetails = await Promise.all(
                    joined.map(async (uc) => {
                        const chRes = await axios.get(
                            `http://localhost:3000/challenges/${uc.challengeId}`
                        );
                        return { ...uc, challenge: chRes.data };
                    })
                );

                setJoinedChallenges(joinedWithDetails);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user?.email]);

    // ✅ DELETE
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete your challenge!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/challenges/${id}`);
                setCreatedChallenges((prev) => prev.filter((ch) => ch._id !== id));
                Swal.fire("Deleted!", "Your challenge has been deleted.", "success");
            } catch {
                Swal.fire("Error", "Failed to delete challenge.", "error");
            }
        }
    };

    // ✅ EDIT (no MySwal)
   const handleEdit = (challenge) => {
    Swal.fire({
        title: `<span class="text-primary">Edit Challenge</span>`,
        width: "800px",
        html: `
        <div class="max-w-3xl mx-auto py-4 px-3 text-left">
          <form id="editForm" class="space-y-4">
            <div class='flex flex-col gap-1'>
              <label class="font-bold text-accent">Title</label>
              <input type="text" id="title" value="${challenge.title}" readonly
                class="w-full border-2 px-3 py-2 rounded bg-gray-100 cursor-not-allowed border-gray-300 font-semibold outline-0 text-primary" />
            </div>

            <div class='flex flex-col gap-1'>
              <label class="font-bold text-accent">Category</label>
              <input type="text" id="category" value="${challenge.category}"
                class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class='flex flex-col gap-1'>
                <label class="font-bold text-accent">Duration (days)</label>
                <input type="number" id="duration" value="${challenge.duration}"
                  class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
              </div>
              <div class='flex flex-col gap-1'>
                <label class="font-bold text-accent">Impact Metric</label>
                <input type="text" id="impactMetric" value="${challenge.impactMetric}"
                  class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
              </div>
            </div>

            <div class='flex flex-col gap-1'>
              <label class="font-bold text-accent">Target</label>
              <input type="text" id="target" value="${challenge.target}"
                class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class='flex flex-col gap-1'>
                <label class="font-bold text-accent">Start Date</label>
                <input type="date" id="startDate" value="${new Date(challenge.startDate).toISOString().split("T")[0]}"
                  class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
              </div>
              <div class='flex flex-col gap-1'>
                <label class="font-bold text-accent">End Date</label>
                <input type="date" id="endDate" value="${new Date(challenge.endDate).toISOString().split("T")[0]}"
                  class="w-full border-2 px-3 py-2 rounded border-gray-300 font-semibold outline-0" />
              </div>
            </div>
          </form>
        </div>
      `,
        showCancelButton: true,
        cancelButtonColor: "#7fba2d", // bg-primary
        confirmButtonText: "Save Changes",
        confirmButtonColor: "#7fba2d", // same as cancel
        focusConfirm: false,
        preConfirm: () => {
            return {
                category: document.getElementById("category").value,
                duration: parseInt(document.getElementById("duration").value),
                impactMetric: document.getElementById("impactMetric").value,
                target: document.getElementById("target").value,
                startDate: document.getElementById("startDate").value,
                endDate: document.getElementById("endDate").value,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.patch(
                    `http://localhost:3000/challenges/${challenge._id}`,
                    result.value
                );
                Swal.fire("Updated!", "Challenge updated successfully.", "success");
                setCreatedChallenges((prev) =>
                    prev.map((ch) =>
                        ch._id === challenge._id ? { ...ch, ...result.value } : ch
                    )
                );
            } catch {
                Swal.fire("Error", "Failed to update challenge.", "error");
            }
        }
    });
};

    if (loading) return <Loading />;

    return (
        <div className="bg-[#f5faf7] py-12 px-4 md:px-8 xl:px-25">
            <div className="max-w-6xl mx-auto">
                {/* Created Challenges */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                        My Created Challenges
                    </h2>
                    <p className="text-gray-600">
                        Manage the challenges you’ve created for the community.
                    </p>
                </div>

                {createdChallenges.length > 0 ? (
                    <div className="space-y-4 mb-16">
                        {createdChallenges.map((ch) => (
                            <div
                                key={ch._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        {ch.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        {ch.description.slice(0, 120)}...
                                    </p>
                                    <div className="text-sm text-gray-500 flex flex-wrap gap-3">
                                        <span className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-primary" />
                                            {new Date(ch.startDate).toLocaleDateString()} -{" "}
                                            {new Date(ch.endDate).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FaUsers className="text-primary" />{" "}
                                            {ch.participants || 0} participants
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <BiCategory className="text-primary" /> {ch.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-3">
                                    <button
                                        onClick={() => handleEdit(ch)}
                                        className="bg-primary text-white py-1 px-3 rounded-md text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ch._id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg mb-16">
                        You haven’t created any challenges yet.
                    </p>
                )}



                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">My Joined Challenges</h2>
                    <p className="text-gray-600">Track your joined challenges and see your progress.</p>
                </div>
                {
                    joinedChallenges.length > 0
                        ? (
                            <div className="space-y-5">
                                {
                                    joinedChallenges.map((uc) => (
                                        <div key={uc._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                                                <h3 className="text-2xl font-semibold text-primary mb-2 md:mb-0">{uc.challenge?.title}</h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-2">
                                                        <FaCalendarAlt className="text-primary" />
                                                        Joined: {new Date(uc.joinDate).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <FaClock className="text-primary" />{" "}
                                                        <span className="font-semibold">{uc.status}</span>
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <FaUsers className="text-primary" />
                                                        {uc.challenge?.participants || 0} participants
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mb-4">
                                                {
                                                    uc.challenge?.description?.length > 180
                                                        ? uc.challenge?.description?.slice(0, 180) + "..."
                                                        : uc.challenge?.description
                                                }
                                            </p>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                <div className="text-sm text-gray-500 font-medium">
                                                    Progress:{" "}
                                                    <span className="text-primary font-semibold">
                                                        {uc.progress}%
                                                    </span>
                                                </div>
                                                <div className="flex-1 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className="h-3 rounded-full bg-primary transition-all duration-500"
                                                        style={{ width: `${uc.progress}%` }}
                                                    ></div>

                                                </div>
                                                <Link to={`/challenges/${uc.challenge?._id}`} className=' bg-primary py-0.5 px-4 rounded-full text-white font-bold cursor-pointer hover:bg-white hover:text-accent duration-350'>view detail</Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        : <p className="text-center text-gray-500 text-lg">You haven’t joined any challenges yet.</p>
                }
            </div>
        </div>
    );
};

export default MyActivities;
