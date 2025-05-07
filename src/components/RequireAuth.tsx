import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
    roles?: string[]; // ['admin'], ['user']
}

const RequireAuth: React.FC<Props> = ({ children, roles }) => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roles && (!userRole || !roles.includes(userRole))) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
