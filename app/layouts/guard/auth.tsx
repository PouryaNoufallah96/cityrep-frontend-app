import { Outlet } from "react-router";
import {useAuthGuard} from "~/hooks/useAuthGuard";
import AuthGuardError from "./AuthGuardError";

const AuthLayout = () => {
    const { allowed, hasProfileError, retryProfile, isRetrying } = useAuthGuard("auth");
    if (hasProfileError) {
        return (
            <AuthGuardError
                isRetrying={isRetrying}
                onRetry={() => void retryProfile()}
            />
        );
    }
    if (!allowed) return null;
    return <Outlet />;
};

export default AuthLayout;
