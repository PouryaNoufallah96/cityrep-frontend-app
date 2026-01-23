import { Check } from "lucide-react";
import { trends } from "~/constants/mock";

const SelectTrend = ({
    setSelectedTrend,
    SelectedTrend,
    errors
}: {
    setSelectedTrend: (id: number) => void,
    SelectedTrend: number | null
    errors: string[]
}) => {



    return <div className="w-full flex flex-col gap-4">
        {
            trends.map(trend => (
                <button onClick={() => setSelectedTrend(trend.id)} key={trend.id} className="w-full border border-[#A0A0A0] rounded-[12px] p-3 flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 bg-primary-700/8 rounded-[8px] flex items-center justify-center">
                            <img src={trend.icon || "/images/mock/defaultTrendPurple.png"} alt={trend.label} className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col items-start gap-1">
                            <div className="text-primary-700">
                                {trend.label}
                            </div>
                            <div className="text-white text-sm">
                                {trend.price.toLocaleString("fa-IR")} تومان
                            </div>
                        </div>

                    </div>
                    <div className={`border ${SelectedTrend === trend.id ? "bg-primary-700 border-primary-700" : "border-[#A0A0A0]"} w-5 h-5 rounded-full border flex items-center justify-center`}>
                        {
                            SelectedTrend === trend.id && <Check className="w-3 h-3" />
                        }
                    </div>

                </button>
            ))



        }
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