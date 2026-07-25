import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import GymHistoryCard from "~/components/history/GymHistoryCard";
import RateSheet from "~/components/history/RateSheet";
import { useGetClientGymAttendanceListInfinite } from "~/reactQuery/gymAttendance/hooks";
import { GymAttendanceState, type ClientGymAttendanceItem } from "~/reactQuery/gymAttendance/services";
import {
    getLatestRateableAttendance,
    sortAttendancesNewestFirst,
} from "~/components/history/rating";
import { formatJalaliDate, formatMinutes } from "~/lib/utils";

const toPersianDigits = (value: string) =>
    value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const formatHistoryDateTime = (sessionDate: string, gymStart: number) =>
    `${formatJalaliDate(sessionDate)} | ${toPersianDigits(formatMinutes(gymStart))}`;

export default function HistoryPage() {
    const [selectedGym, setSelectedGym] = useState<ClientGymAttendanceItem | null>();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useGetClientGymAttendanceListInfinite({
        states: [
            GymAttendanceState.Expired,
            GymAttendanceState.Failed,
            GymAttendanceState.Used,
        ],
    });

    const listRef = useRef<HTMLDivElement>(null);

    const attendances = sortAttendancesNewestFirst(
        data?.pages.flatMap(page => page.data) ?? [],
    );
    const latestRateableAttendance = getLatestRateableAttendance(attendances);

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
                            <div className="w-full h-[60px]" />
                        </div>
                    ))
                ) : !attendances.length ? (
                    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-4">
                        <div className="mb-6 flex size-24 items-center justify-center rounded-full border border-secondary-main">
                            <Clock className="size-10 text-secondary-main" />
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
                                date={formatHistoryDateTime(item.sessionDate, item.gymStart)}
                                address={item.gymAddress?.address || ""}
                                handleRate={
                                    item.gymAttendanceId === latestRateableAttendance?.gymAttendanceId
                                        ? () => setSelectedGym(item)
                                        : undefined
                                }
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

            {selectedGym && (
                <RateSheet
                    gymAttendanceId={selectedGym.gymAttendanceId}
                    image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + selectedGym.gymImageUrl}
                    title={selectedGym.gymTitle}
                    open={!!selectedGym}
                    handleOpenChange={(open) => {
                        if (!open) setSelectedGym(undefined);
                    }}
                />
            )}

        </div>
    )
}
