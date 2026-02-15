import { Navigate, Outlet, useLocation } from "react-router-dom";

const VerifyOtpGuard = () => {
    const { state } = useLocation();
    if(state?.email){
        return <Outlet />
    }else{
        return <Navigate to={'/forgot-password'} replace />
    }
}

export default VerifyOtpGuard;

