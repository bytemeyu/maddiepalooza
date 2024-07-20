import React from 'react';
import { Route, Navigate, useLocation, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { ProtectedRouteProps } from '../types/protectedRoute';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    
    return isAuthenticated 
    ? ( <Component {...rest} />)
    : (<Navigate to="/login" state={{ from: location }} replace />)
};
//(?) ver depois
