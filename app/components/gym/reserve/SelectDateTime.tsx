import { Check, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    formatMinutes,
    getClosuresForDay,
    getJalaliDateLabel,
    getRelativeDayLabel,
    getSessionClosure,
    getTodayAndTomorrow,
} from "~/lib/utils";
import type { DayOfWeek, GymDaySchedule, GymResult } from "~/reactQuery/gym/services";

const SelectDateTime = ({
    selectedSessionId,
    setSelectedSessionId,
    selectedTrend,
    errors,
    gym,
}: {
    selectedSessionId: string | null;
    setSelectedSessionId: (id: string | null) => void;
    errors: string[];
    selectedTrend: string | null;
    gym?: GymResult;
}) => {
    const { t } = useTranslation();
    const [trendId, gender] = selectedTrend?.split("-") ?? [];

    const trend = gym?.trends.find(
        (item) => item.gymTrendId === trendId,
    );

    const trendDateTimes: GymDaySchedule[] = useMemo(() => {
        if (gender === "men") return trend?.men ?? [];
        if (gender === "women") return trend?.women ?? [];
        return [];
    }, [gender, trend?.men, trend?.women]);

    const selectableDays = useMemo(() => {
        const allowedDays = getTodayAndTomorrow();
        return [...trendDateTimes]
            .filter((day) => allowedDays.includes(day.dayOfWeek))
            .reverse();
    }, [trendDateTimes]);

    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(
        () => selectableDays[0]?.dayOfWeek ?? null,
    );

    const dayClosures = getClosuresForDay(
        gym?.upcomingClosures,
        selectedDay,
    );

    const sessions = trendDateTimes.find((d) => d.dayOfWeek === selectedDay)
        ?.sessions ?? [];

    const sessionItems = sessions.map((session) => {
        const closure = getSessionClosure(session, dayClosures);

        return {
            session,
            isDisabled: Boolean(closure),
            reason: closure?.reason,
        };
    });

    useEffect(() => {
        if (!selectableDays.length) {
            if (selectedDay !== null) setSelectedDay(null);
            return;
        }

        const stillValid = selectableDays.some(
            (day) => day.dayOfWeek === selectedDay,
        );
        if (!stillValid) {
            setSelectedDay(selectableDays[0].dayOfWeek);
        }
    }, [selectableDays, selectedDay]);

    useEffect(() => {
        const firstAvailable = sessionItems.find((s) => !s.isDisabled);

        if (!firstAvailable) {
            if (selectedSessionId !== null) {
                setSelectedSessionId(null);
            }
            return;
        }

        if (selectedSessionId !== firstAvailable.session.gymSessionId) {
            setSelectedSessionId(firstAvailable.session.gymSessionId);
        }
    }, [sessionItems, selectedSessionId, setSelectedSessionId]);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex justify-center">
                <div className="flex size-14 items-center justify-center rounded-full border border-primary-700 text-primary-700">
                    <Clock className="size-6" />
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                {selectableDays.map((day) => (
                    <button
                        key={day.dayOfWeek}
                        type="button"
                        className={`h-10 w-full border rounded-[12px] flex items-center justify-center text-sm
        ${selectedDay === day.dayOfWeek
                            ? "bg-primary-main border-primary-main text-white"
                            : "text-white border-[#A0A0A0]"
                        }`}
                        onClick={() => setSelectedDay(day.dayOfWeek)}
                    >
                        {getRelativeDayLabel(day.dayOfWeek)}
                    </button>
                ))}
            </div>

            <div className="w-full flex flex-col gap-6">
                {selectedDay && (
                    <div className="text-center text-[#E2DAFF]">
                        {getJalaliDateLabel(selectedDay)}
                    </div>
                )}
                <div className="w-full flex flex-col gap-3 overflow-x-auto my-scroll">
                    {sessionItems.map(({ session, isDisabled, reason }) => (
                        <button
                            key={session.gymSessionId}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => {
                                if (!isDisabled) {
                                    setSelectedSessionId(session.gymSessionId);
                                }
                            }}
                            className={`w-full h-14 border rounded-[12px] p-3 flex justify-between items-center
        ${isDisabled
                                ? "opacity-40 cursor-not-allowed border-[#555]"
                                : selectedSessionId === session.gymSessionId
                                    ? "bg-primary-700/12 border-primary-700"
                                    : "border-[#A0A0A0] text-white"
                            }`}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-sm text-white">
                                    {formatMinutes(session.from)} - {formatMinutes(session.to)}
                                </div>

                                {isDisabled && reason && (
                                    <div className="text-xs text-destructive">
                                        {reason}
                                    </div>
                                )}
                            </div>

                            <div
                                className={`border w-5 h-5 rounded-full flex items-center justify-center
          ${!isDisabled && selectedSessionId === session.gymSessionId
                                    ? "bg-primary-700 border-primary-700"
                                    : "border-[#A0A0A0]"
                                }`}
                            >
                                {!isDisabled && selectedSessionId === session.gymSessionId && (
                                    <Check className="w-3 h-3" />
                                )}
                            </div>
                        </button>
                    ))}
                    {dayClosures.some((c) => c.isAllDay) && (
                        <div className="text-center text-destructive text-sm mt-2">
                            {t("gym.reserve.closedAllDay")}
                        </div>
                    )}
                    {sessions.length === 0 && (
                        <div className="text-center text-[#E2DAFF]">
                            {t("gym.reserve.noSessionsAvailable")}
                        </div>
                    )}
                </div>
            </div>

            {errors.length > 0 && (
                <div className="text-destructive text-sm mt-2">
                    {errors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectDateTime;
