import { Calendar, MapPin, QrCode, User, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router"

const navItems = [
    {
        icon: <User />,
        link: "/user"
    },
    {
        icon: <MapPin />,
        link: "/"
    },
    {
        icon: <Wallet />,
        link: "/wallet"
    },
    {
        icon: <QrCode />,
        link: "/qr"
    },
    {
        icon: <Calendar />,
        link: "/calendar"
    },

]
const BottomNav = () => {
    const location = useLocation();

    // helper to check if the current path matches
    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="w-[280px] h-14 rounded-full bg-[#202020] shadow-[0px_0px_8px_0px_#947DFFCC] fixed bottom-4 flex items-center justify-between px-[11px] py-2">
            {
                navItems.map((nav, index) => (
                    <Link key={index} to={nav.link} className={`rounded-full w-10 h-10 flex items-center justify-center text-primary-100 
                    ${isActive(nav.link) ? "bg-primary-main text-white" : "bg-radial-[50%_50%_at_50%_50%,_rgba(148,_125,_255,_0)_80%,_rgba(148,_125,_255,_0.4)_100%)]"}
                    `}>
                        {nav.icon}
                    </Link>
                ))
            }

        </div>
    )
}

export default BottomNav