import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
    roles?: string[]; // ['admin'], ['user']
}

const RequireAuth: React.FC<Props> = ({ children, roles }) => {
    const [isReady, setIsReady] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedRole = localStorage.getItem('role');
        setToken(storedToken);
        setUserRole(storedRole);
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roles && (!userRole || !roles.includes(userRole))) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
