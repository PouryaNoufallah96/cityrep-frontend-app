import {Outlet} from "react-router";
import {useAuthGuard} from "~/hooks/useAuthGuard";

const GuestLayout = () => {
    const checked = useAuthGuard("guest");
    if (!checked || checked === undefined) return null;
    return <Outlet/>;
};

export default GuestLayout;
