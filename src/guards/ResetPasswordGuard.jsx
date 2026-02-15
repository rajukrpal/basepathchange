import { Navigate, Outlet, useLocation } from "react-router-dom";

const ResetPasswordGuard = () => {
    const { state } = useLocation();
    if(state?.email && state?.verified){
        return <Outlet />
    }else{
        return <Navigate to={'/forgot-password'} replace />
    }
}

export default ResetPasswordGuard;

