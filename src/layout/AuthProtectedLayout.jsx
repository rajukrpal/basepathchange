import GuestGuard from "@/guards/GuestGuard";
import ScrollToTop from "@/components/common/ScrollToTop";

const AuthProtectedLayout = () => {
    return (
        <>
            <ScrollToTop />
            <GuestGuard />
        </>
    );
};

export default AuthProtectedLayout;

