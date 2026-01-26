import { useEffect, useRef, useState } from "react";
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
        isFetchingNextPage
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
                {attendances.map(item => (
                    <GymHistoryCard
                        key={item.gymAttendanceId}
                        image={item.gymImageUrl}
                        title={item.gymTitle}
                        date={new Date(item.sessionDate).toLocaleString("fa-IR")}
                        address={item.gymAddress}
                        handleRate={() => setSelectedGym(item)}
                    />
                ))}

                {isFetchingNextPage && (
                    <p className="text-center text-gray-400 py-4">
                        در حال بارگذاری…
                    </p>
                )}
                {
                    !attendances.length && (
                        <p className="text-center text-gray-400 py-4">
                            هنوز هیچ سابقه‌ای وجود ندارد.
                        </p>
                    )
                }
            </div>

            {selectedGym && <RateSheet
                handleRate={(rate) => {
                    console.log("rate", rate);
                    toast.success(`امتیاز باشگاه ${selectedGym?.gymTitle} ثبت شد`)

                    setSelectedGym(undefined)
                }}
                image={selectedGym?.gymImageUrl} title={selectedGym?.gymTitle} open={!!selectedGym}
                handleOpenChange={() => setSelectedGym(undefined)} />}

        </div>
    )
}
