import { useEffect, useRef } from "react"
import QrGymItem from "~/components/qr/QrGymItem"
import { useGetClientGymAttendanceListInfinite } from "~/reactQuery/gymAttendance/hooks"
import { GymAttendanceState } from "~/reactQuery/gymAttendance/services"

const QrcodePage = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetClientGymAttendanceListInfinite({
        states: [GymAttendanceState.Reserved],
    });

    const listRef = useRef<HTMLDivElement>(null);

    const attendances =
        data?.pages.flatMap(page => page.data) ?? [];
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
        <div
            ref={listRef}
            tabIndex={-1}
            aria-label="بلیت‌های فعال"
            className="w-full h-[100svh] gap-3 pb-[100px] overflow-auto my-scroll flex flex-col pt-4 bg-[#121314]"
        >
            {attendances.map(item => (
                <QrGymItem
                    key={item.gymAttendanceId}
                    gym={item}
                    fallbackFocusRef={listRef}
                />
            ))}
        </div>
    )
}

export default QrcodePage
