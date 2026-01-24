import { Banknote, CalendarDays, Clock } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import CheckoutItem from "~/components/gym/reserve/CheckoutItem";
import { dateTimes, trends } from "~/constants/mock";
import { formatMinutes, getJalaliDateLabel, getRelativeDayLabel } from "~/lib/utils";
import type { DayOfWeek, GymDaySchedule, GymResult, GymSession, GymTrend } from "~/reactQuery/gym/services";


type FoundSession = {
    session: GymSession;
    dayOfWeek: DayOfWeek;
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
    const [trendId, gender] = SelectedTrend?.split("-") ?? [];
    const { t } = useTranslation();
    const trend = gym?.trends.find(
        t => t.gymTrendId === trendId
    );

    const findSessionInSchedule = (
        schedule: GymDaySchedule[] | undefined,
        sessionId: string | null
    ): FoundSession | null => {
        if (!schedule || !sessionId) return null;

        for (const day of schedule) {
            const session = day.sessions?.find(
                s => s.gymSessionId === sessionId
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

    const schedule =
        gender === "men"
            ? trend?.men
            : gender === "women"
                ? trend?.women
                : undefined;


    const foundSession = useMemo(
        () => findSessionInSchedule(schedule, selectedSessionId),
        [schedule, selectedSessionId]
    );

    // const dateLabel = foundSession
    //     ? getRelativeDayLabel(foundSession.dayOfWeek)
    //     : "";

    const dateLabel = foundSession
        ? getJalaliDateLabel(foundSession.dayOfWeek)
        : "";

    const timeLabel = foundSession
        ? `${formatMinutes(foundSession.session.from)} تا ${formatMinutes(
            foundSession.session.to
        )}`
        : "";



    console.log(trend, schedule, gym, selectedSessionId, SelectedTrend)


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
            value={t(`week.${foundSession?.dayOfWeek}`) +" "+ dateLabel}
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