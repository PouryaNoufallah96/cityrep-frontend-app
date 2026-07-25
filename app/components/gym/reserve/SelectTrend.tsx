import TrendButton from "~/components/gym/reserve/TrendButton";
import type { GymDaySchedule, GymResult, GymTrend } from "~/reactQuery/gym/services";

type ReserveTrendButtonItem = {
    id: string;
    trendId: string;
    gender: "Male" | "Female";
    title: string;
    rawTitle: string;
    price: number;
    iconFileId?: string;
};

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

    const hasSessions = (schedule: GymDaySchedule[]) => {
        if (!schedule || schedule?.length === 0) return false;
        return schedule.some(day => day.sessions?.length);
    }


    const buildTrendButtons = (trends: GymTrend[]): ReserveTrendButtonItem[] => {
        return trends.flatMap(trend => {
            const items: ReserveTrendButtonItem[] = [];
            if (hasSessions(trend.men)) {
                items.push({
                    id: `${trend.gymTrendId}-men`,
                    trendId: trend.gymTrendId,
                    gender: "Male",
                    title: `${trend.title} (آقایان)`,
                    rawTitle: trend.title,
                    price: calculateMinPrice(trend.men),
                    iconFileId: trend.trendIconUrl,
                });
            }

            if (hasSessions(trend.women)) {
                items.push({
                    id: `${trend.gymTrendId}-women`,
                    trendId: trend.gymTrendId,
                    gender: "Female",
                    title: `${trend.title} (بانوان)`,
                    rawTitle: trend.title,
                    price: calculateMinPrice(trend.women),
                    iconFileId: trend.trendIconUrl,
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
                rawTitle={item.rawTitle}
                price={item.price}
                iconFileId={item.iconFileId}
                selected={SelectedTrend === item.id}
                onClick={() => setSelectedTrend(item.id)}
            />
        ))}

        {
            errors.length > 0 && <div className="text-destructive text-sm mt-2">
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        }
    </div>;
}

export default SelectTrend;
