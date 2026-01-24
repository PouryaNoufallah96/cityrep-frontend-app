import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatMinutes, getClosuresForDay, getRelativeDayLabel, getSessionClosure, getTodayAndTomorrow } from "~/lib/utils";
import type { DayOfWeek, GymDaySchedule, GymResult } from "~/reactQuery/gym/services";

const SelectDateTime = ({
    selectedSessionId,
    setSelectedSessionId,
    selectedTrend,
    errors,
    gym
}: {
    selectedSessionId: string | null,
    setSelectedSessionId: (id: string | null) => void,
    errors: string[],
    selectedTrend: string | null,
    gym?: GymResult
}) => {
    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const { t } = useTranslation();
    const [trendId, gender] =
        selectedTrend?.split("-") ?? [];

    const trend = gym?.trends.find(
        t => t.gymTrendId === trendId
    );
    const trendDateTimes: GymDaySchedule[] =
        gender === "men"
            ? trend?.men ?? []
            : gender === "women"
                ? trend?.women ?? []
                : [];

    const dayClosures = getClosuresForDay(
        gym?.upcomingClosures,
        selectedDay
    );

    const isAllDayClosed = dayClosures.some(c => c.isAllDay);

    const sessions = trendDateTimes.find(d => d.dayOfWeek === selectedDay)
        ?.sessions ?? [];

    const sessionItems = sessions.map(session => {
        const closure = getSessionClosure(session, dayClosures);

        return {
            session,
            isDisabled: Boolean(closure),
            reason: closure?.reason,
        };
    });


    useEffect(() => {
        const firstAvailable = sessionItems.find(
            s => !s.isDisabled
        );

        if (!firstAvailable) {
            if (selectedSessionId !== null) {
                setSelectedSessionId(null);
            }
            return;
        }

        if (selectedSessionId !== firstAvailable.session.gymSessionId) {
            setSelectedSessionId(firstAvailable.session.gymSessionId);
        }
    }, [sessionItems, selectedSessionId]);


    const allowedDays = getTodayAndTomorrow();

    const selectableDays = trendDateTimes.filter(day =>
        allowedDays.includes(day.dayOfWeek)
    );

    useEffect(() => {
        if (!selectedDay && selectableDays.length) {
            setSelectedDay(selectableDays[0].dayOfWeek);
        }
    }, [selectableDays]);



    return <div className="w-full flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-4">
            {
                selectableDays.reverse().map(day => (
                    <button
                        key={day.dayOfWeek}
                        className={`h-10 w-full border
        ${selectedDay === day.dayOfWeek
                                ? "bg-primary-700/12 border-primary-700/12 text-primary-700"
                                : "text-white border-[#A0A0A0]"
                            }
        rounded-[12px] flex items-center justify-center text-sm
      `}
                        onClick={() => setSelectedDay(day.dayOfWeek)}
                    >
                        {t(getRelativeDayLabel(day.dayOfWeek))}
                    </button>
                ))
            }

        </div>


        <div className="w-full flex flex-col gap-6">
            <div className="text-center text-[#E2DAFF]">
                {t(`week.${selectedDay}`)}
            </div>
            <div className="w-full flex flex-col gap-3 overflow-x-auto my-scroll">
                {
                    sessionItems.map(({ session, isDisabled, reason }) => (
                        <button
                            key={session.gymSessionId}
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
                                }
      `}
                        >
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-sm text-white">
                                    {formatMinutes(session.from)} - {formatMinutes(session.to)}
                                </div>

                                {isDisabled && reason && (
                                    <div className="text-xs text-red-400">
                                        {reason}
                                    </div>
                                )}
                            </div>

                            <div
                                className={`border w-5 h-5 rounded-full flex items-center justify-center
          ${!isDisabled && selectedSessionId === session.gymSessionId
                                        ? "bg-primary-700 border-primary-700"
                                        : "border-[#A0A0A0]"
                                    }
        `}
                            >
                                {!isDisabled && selectedSessionId === session.gymSessionId && (
                                    <Check className="w-3 h-3" />
                                )}
                            </div>
                        </button>
                    ))
                }
                {
                    dayClosures.some(c => c.isAllDay) && (
                        <div className="text-center text-red-400 text-sm mt-2">
                            {t("gym.reserve.closedAllDay")}
                        </div>
                    )
                }
                {
                    sessions.length === 0 && <div className="text-center text-[#E2DAFF]">
                        {t("gym.reserve.noSessionsAvailable")
                        }
                    </div>
                }

            </div>
        </div>

        {
            errors.length > 0 && <div className="text-red-500 text-sm mt-2">
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        }
    </div>;
}

export default SelectDateTime;