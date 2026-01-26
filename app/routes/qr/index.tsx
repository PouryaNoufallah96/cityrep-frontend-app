import { Banknote, CalendarDays, ChevronLeft, Clock, QrCode, XIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { PaperPlane } from "react-coolicons"
import CheckoutItem from "~/components/gym/reserve/CheckoutItem"
import QrGymItem from "~/components/qr/QrGymItem"
import { dateTimes, trends } from "~/constants/mock"
import { useGetClientGymAttendanceListInfinite } from "~/reactQuery/gymAttendance/hooks"

const QrcodePage = () => {
    const [showQr, setShowQr] = useState(false)
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useGetClientGymAttendanceListInfinite({
        states: ["Reserved"],
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

        <>


            <div
                ref={listRef}
                className="w-full h-[100svh] gap-3 pb-[100px] overflow-auto my-scroll flex flex-col pt-4 bg-[#121314]">
                {
                    attendances.map(item => (
                        <QrGymItem key={item.gymAttendanceId} gym={item} />
                    ))
                }



            </div>
        </>
    )
}

export default QrcodePage