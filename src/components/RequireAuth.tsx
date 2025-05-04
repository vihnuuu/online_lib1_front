import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
    roles?: string[]; // ['admin'], ['user'], тощо
}

const RequireAuth: React.FC<Props> = ({ children, roles }) => {
    const token = localStorage.getItem('token'); // або sessionStorage
    const userRole = localStorage.getItem('role'); // зберігаємо при логіні

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(userRole || '')) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default RequireAuth;
