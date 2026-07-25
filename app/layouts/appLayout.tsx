import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import BottomNav from "~/components/shared/BottomNav";
import RateSheet from "~/components/history/RateSheet";
import { getLatestRateableAttendance } from "~/components/history/rating";
import { useGetClientGymAttendanceListInfinite } from "~/reactQuery/gymAttendance/hooks";
import { GymAttendanceState } from "~/reactQuery/gymAttendance/services";

const AppLayout = () => {
    const location = useLocation();
    const [isRatePromptDismissed, setIsRatePromptDismissed] = useState(false);
    const { data } = useGetClientGymAttendanceListInfinite(
        { states: [GymAttendanceState.Used] },
        20,
    );
    const latestRateableAttendance = getLatestRateableAttendance(
        data?.pages.flatMap((page) => page.data) ?? [],
    );
    const isHistoryRoute = location.pathname.startsWith("/history");
    const isRateSheetOpen =
        !!latestRateableAttendance && !isRatePromptDismissed && !isHistoryRoute;

    return (
        <div className="w-full h-full flex flex-col justify-between items-center  bg-[#121314]">
            <div className="relative z-[10] h-full w-full px-4 flex flex-col items-center">
                <Outlet />
            </div>
            <div className="w-full relative overflow-visible z-[100] flex items-center justify-center">
                <BottomNav />
            </div>
            {latestRateableAttendance && (
                <RateSheet
                    gymAttendanceId={latestRateableAttendance.gymAttendanceId}
                    image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + latestRateableAttendance.gymImageUrl}
                    title={latestRateableAttendance.gymTitle}
                    open={isRateSheetOpen}
                    handleOpenChange={(open) => {
                        if (!open) setIsRatePromptDismissed(true);
                    }}
                />
            )}
        </div>
    )
}
export default AppLayout
