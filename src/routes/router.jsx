import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorLayout from "../layouts/ErrorLayout";
import Challenges from "../components/Challenges";
import MyActivities from "../components/MyActivities";
import Loading from "../components/Loading";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import MyProfilePage from "../../MyProfilePage";
import ChallengeDetails from "../components/ChallengeDetails";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AddChallenge from "../components/AddChallenge";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "",
                element: <HomePage></HomePage>,
            },
            {
                path: "/my-profile",
                element: <PrivateRoute><MyProfilePage></MyProfilePage></PrivateRoute>,
            },
            {
                path: "/challenges",
                loader: () => fetch('http://localhost:3000/challenges'),
                element: <Challenges></Challenges>,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "/challenges/:id",
                loader: ({ params }) => fetch(`http://localhost:3000/challenges/${params.id}`),
                element: <ChallengeDetails></ChallengeDetails>,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "/my-activities",
                element: <PrivateRoute><MyActivities></MyActivities></PrivateRoute>,
            },
            {
                path: "/add-challenge",
                element: <PrivateRoute><AddChallenge></AddChallenge></PrivateRoute>,
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <PublicRoute><LoginPage></LoginPage></PublicRoute>,
            },
            {
                path: "/auth/forget-password",
                element: <PublicRoute><ForgetPasswordPage></ForgetPasswordPage></PublicRoute>,
            },
            {
                path: "/auth/register",
                element: <PublicRoute><RegisterPage></RegisterPage></PublicRoute>,
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorLayout></ErrorLayout>,
    },
]);

export default router;