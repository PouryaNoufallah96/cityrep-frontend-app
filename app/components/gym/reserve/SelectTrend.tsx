import { Check } from "lucide-react";
import TrendButton from "~/components/gym/reserve/TrendButton";
import { trends } from "~/constants/mock";
import type { GymDaySchedule, GymResult, GymTrend } from "~/reactQuery/gym/services";
import type { TrendButtonItem } from "~/types";

const SelectTrend = ({
    setSelectedTrend,
    SelectedTrend,
    errors,
    gym
}: {
    setSelectedTrend: (id: string) => void,
    SelectedTrend: string | null
    errors: string[]
    gym?: GymResult
}) => {
    const calculateMinPrice = (trendSchedule: GymDaySchedule[]) => {
        const prices = trendSchedule.flatMap(
            day => day.sessions?.map(session => session.price) ?? []
        );

        return prices.length ? Math.min(...prices) : 0;
    };

    const hasSessions = (schedule: GymDaySchedule[]) =>
        schedule.some(day => day.sessions?.length);


    const buildTrendButtons = (trends: GymTrend[]): TrendButtonItem[] => {
        return trends.flatMap(trend => {
            const items: TrendButtonItem[] = [];

            if (hasSessions(trend.men)) {
                items.push({
                    id: `${trend.gymTrendId}-men`,
                    trendId: trend.gymTrendId,
                    gender: "Male",
                    title: `${trend.title} (آقایان)`,
                    price: calculateMinPrice(trend.men),
                    icon: import.meta.env.VITE_BASE_API + "/File/DownloadFile/" +trend.trendIconUrl,
                });
            }

            if (hasSessions(trend.women)) {
                items.push({
                    id: `${trend.gymTrendId}-women`,
                    trendId: trend.gymTrendId,
                    gender: "Female",
                    title: `${trend.title} (بانوان)`,
                    price: calculateMinPrice(trend.women),
                    icon: import.meta.env.VITE_BASE_API + "/File/DownloadFile/" +trend.trendIconUrl,
                });
            }

            return items;
        });
    };

    const trendButtons = buildTrendButtons(gym?.trends ?? []);



    return <div className="w-full flex flex-col gap-4">
        {trendButtons.map(item => (
            <TrendButton
                key={item.id}
                title={item.title}
                price={item.price}
                icon={item.icon}
                selected={SelectedTrend === item.id}
                onClick={() => setSelectedTrend(item.id)}
            />
        ))}

        {
            errors.length > 0 && <div className="text-red-500 text-sm mt-2">
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        }
    </div>;
}

export default SelectTrend;