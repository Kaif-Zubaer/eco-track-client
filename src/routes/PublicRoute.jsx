import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';
import Loading from '../components/Loading';

const PublicRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    if (loading) {
        return <Loading></Loading>;
    }

    if (user) {
        return <Navigate to='/'></Navigate>;
    }
    return children;
};

export default PublicRoute;