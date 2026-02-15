import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default AuthGuard;

