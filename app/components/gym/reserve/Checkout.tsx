import { Banknote, CalendarDays, Clock } from "lucide-react";
import { useMemo } from "react";
import CheckoutItem from "~/components/gym/reserve/CheckoutItem";
import { formatMinutes, getJalaliDateLabel } from "~/lib/utils";
import type { DayOfWeek, GymResult, GymSession } from "~/reactQuery/gym/services";


export type FoundSession = {
    session: GymSession;
    dayOfWeek: DayOfWeek;
};

export const findSelectedSession = (
    gym: GymResult | undefined,
    selectedTrend: string | null,
    selectedSessionId: string | null,
): FoundSession | null => {
    if (!gym || !selectedTrend || !selectedSessionId) return null;

    const [trendId, gender] = selectedTrend.split("-");
    const trend = gym.trends.find(item => item.gymTrendId === trendId);
    const schedule =
        gender === "men"
            ? trend?.men
            : gender === "women"
                ? trend?.women
                : undefined;

    for (const day of schedule ?? []) {
        const session = day.sessions?.find(
            item => item.gymSessionId === selectedSessionId,
        );

        if (session) {
            return {
                session,
                dayOfWeek: day.dayOfWeek,
            };
        }
    }

    return null;
};

const Checkout = ({
    SelectedTrend,
    selectedSessionId,
    gym
}: {
    SelectedTrend: string | null,
    selectedSessionId: string | null,
    gym?: GymResult

}) => {
    const [trendId] = SelectedTrend?.split("-") ?? [];
    const trend = gym?.trends.find(
        (item) => item.gymTrendId === trendId
    );

    const foundSession = useMemo(
        () => findSelectedSession(gym, SelectedTrend, selectedSessionId),
        [SelectedTrend, gym, selectedSessionId]
    );

    const dateLabel = foundSession
        ? getJalaliDateLabel(foundSession.dayOfWeek)
        : "";

    const timeLabel = foundSession
        ? `${formatMinutes(foundSession.session.from)} تا ${formatMinutes(
            foundSession.session.to
        )}`
        : "";

    return <div className="w-full bg-[#121314] rounded-[16px] flex flex-col gap-4 p-4">
        <div className="bg-primary-700/12 w-full rounded-[10px] p-4 flex items-center justify-between">
            <p className="text-white">{gym?.title}</p>
            <div className="rounded-full text-[#CEC7F6] bg-primary-700/8 border border-[#CEC7F6] px-5 py-2 text-sm flex items-center justify-center">
                {
                    trend ? trend.title : "بدون رشته ورزشی"
                }
            </div>
        </div>

        <CheckoutItem
            icon={<CalendarDays className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="تاریخ"
            value={dateLabel}
        />
        <CheckoutItem
            icon={<Clock className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="ساعت"
            value={timeLabel}
        />

        <CheckoutItem
            icon={<Banknote className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="مبلغ"
            value={
                foundSession?.session.price?.toLocaleString("fa-IR") + " تومان"
            }
        />



    </div>;
}

export default Checkout;
