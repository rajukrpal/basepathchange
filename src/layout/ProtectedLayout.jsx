import AuthGuard from "@/guards/AuthGuard";
import ScrollToTop from "@/components/common/ScrollToTop";

const ProtectedLayout = () => {
    return (
        <>
            <ScrollToTop />
            <AuthGuard />
        </>
    );
};

export default ProtectedLayout;

