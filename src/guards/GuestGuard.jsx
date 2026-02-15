import { Navigate, Outlet } from "react-router-dom";

const GuestGuard = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Outlet />;
    } else {
        return <Navigate to="/dashboard" replace />;
    }
};

export default GuestGuard;

