import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import GymHistoryCard from "~/components/history/GymHistoryCard";
import RateSheet from "~/components/history/RateSheet";
import { toast } from "sonner";
import { useGetClientGymAttendanceListInfinite } from "~/reactQuery/gymAttendance/hooks";
import type { ClientGymAttendanceItem } from "~/reactQuery/gymAttendance/services";



export default function HistoryPage() {
    const [selectedGym, setSelectedGym] = useState<ClientGymAttendanceItem | null>();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useGetClientGymAttendanceListInfinite({
        states: ["Expired", "Failed", "Used"],
    });

    const listRef = useRef<HTMLDivElement>(null);

    const attendances =
        data?.pages.flatMap(page => page.data) ?? [];
    // 🔹 Infinite scroll (safe)
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const onScroll = () => {
            if (!hasNextPage || isFetchingNextPage) return;

            const nearBottom =
                el.scrollTop + el.clientHeight >= el.scrollHeight - 120;

            if (nearBottom) {
                fetchNextPage();
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <div className="pt-4 w-full">

            <div
                ref={listRef}
                className="w-full flex flex-col gap-4 my-4 my-scroll h-[calc(100svh-100px)] overflow-auto"
            >
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-full bg-[#121314] rounded-[16px] p-3 animate-pulse">
                            <div className="w-full grid grid-cols-[140px_1fr] relative">
                                <div className="w-[140px] h-[100px] rounded-lg bg-white/5" />
                                <div className="w-full h-full flex flex-col justify-between py-2 px-3">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="w-24 h-4 bg-white/5 rounded" />
                                        <div className="w-4 h-4 bg-white/5 rounded" />
                                    </div>
                                    <div className="w-20 h-3 bg-white/5 rounded" />
                                    <div className="w-32 h-3 bg-white/5 rounded" />
                                </div>
                                <div className="absolute top-[88px] left-3 w-40 h-[28px] bg-white/5 rounded-full" />
                            </div>
                            <div className="w-full h-[60px]" /> {/* Spacer for Rate button positioning */}
                        </div>
                    ))
                ) : !attendances.length ? (
                    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-4">
                        <div className="w-24 h-24 bg-[#121314] rounded-full flex items-center justify-center mb-6">
                            <Clock className="text-secondary-main w-10 h-10 opacity-70" />
                        </div>
                        <p className="text-white font-bold text-lg mb-2">سابقه‌ای یافت نشد!</p>
                        <p className="text-white/50 text-sm max-w-[250px]">
                            شما هنوز به هیچ باشگاهی مراجعه نکرده‌اید.
                        </p>
                    </div>
                ) : (
                    <>
                        {attendances.map(item => (
                            <GymHistoryCard
                                key={item.gymAttendanceId}
                                image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + item.gymImageUrl}
                                title={item.gymTitle}
                                date={new Date(item.sessionDate).toLocaleString("fa-IR")}
                                address={item.gymAddress?.address || ""}
                                handleRate={() => setSelectedGym(item)}
                            />
                        ))}

                        {isFetchingNextPage && (
                            <p className="text-center text-xs text-gray-400 py-4">
                                در حال بارگذاری…
                            </p>
                        )}
                    </>
                )}
            </div>

            {selectedGym && <RateSheet
                handleRate={(rate) => {
                    console.log("rate", rate);
                    toast.success(`امتیاز باشگاه ${selectedGym?.gymTitle} ثبت شد`)

                    setSelectedGym(undefined)
                }}
                image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + selectedGym?.gymImageUrl} title={selectedGym?.gymTitle} open={!!selectedGym}
                handleOpenChange={() => setSelectedGym(undefined)} />}

        </div>
    )
}
