import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, Navigate } from 'react-router';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (user) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to='/auth/login'></Navigate>;
    }
};

export default PrivateRoute;