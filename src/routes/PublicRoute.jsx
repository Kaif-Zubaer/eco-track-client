import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';

const PublicRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (user) {
        return <Navigate to={location.state?.from || '/'} replace></Navigate>;
    }
    return children;
};

export default PublicRoute;