import { Outlet } from "react-router";
import {useAuthGuard} from "~/hooks/useAuthGuard";

const AuthLayout = () => {
    const checked = useAuthGuard("auth");
    if (!checked || checked === undefined) return null;
    return <Outlet />;
};

export default AuthLayout;
