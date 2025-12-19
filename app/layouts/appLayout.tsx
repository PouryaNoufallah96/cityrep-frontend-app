import { Outlet } from "react-router";
import BottomNav from "~/components/shared/BottomNav";

const AppLayout = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center  bg-[#121314]">
            <div className="relative z-[10] h-full w-full px-4 flex flex-col items-center">
                <Outlet />
            </div>
            <div className="w-full relative overflow-visible z-[100] flex items-center justify-center">
                <BottomNav />
            </div>
        </div>
    )
}
export default AppLayout