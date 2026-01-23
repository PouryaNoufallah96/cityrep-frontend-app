import { Banknote, CalendarDays, Clock } from "lucide-react";
import CheckoutItem from "~/components/gym/reserve/CheckoutItem";
import { dateTimes, trends } from "~/constants/mock";

const checkoutData = {

}
const Checkout = ({
    gymName,
    SelectedTrend,
    selectedDateTime,
}: {
    gymName: string,
    SelectedTrend: number | null,
    selectedDateTime: {
        id: number,
        timeId: number
    } | null,
}) => {

    return <div className="w-full bg-[#121314] rounded-[16px] flex flex-col gap-4 p-4">
        <div className="bg-primary-700/12 w-full rounded-[10px] p-4 flex items-center justify-between">
            <p className="text-white">{gymName}</p>
            <div className="rounded-full text-[#CEC7F6] bg-primary-700/8 border border-[#CEC7F6] px-5 py-2 text-sm flex items-center justify-center">
                {
                    trends.find(t => t.id === SelectedTrend) ? trends.find(t => t.id === SelectedTrend)?.label : ""
                }
            </div>
        </div>

        <CheckoutItem
            icon={<CalendarDays className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="تاریخ"
            value={dateTimes.find(d => d.id === selectedDateTime?.id)?.dateText || ""}
        />
        <CheckoutItem
            icon={<Clock className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="ساعت"
            value={dateTimes.find(d => d.id === selectedDateTime?.id)?.times.find(t => t.id === selectedDateTime?.timeId) ? `${dateTimes.find(d => d.id === selectedDateTime?.id)?.times.find(t => t.id === selectedDateTime?.timeId)?.start} تا ${dateTimes.find(d => d.id === selectedDateTime?.id)?.times.find(t => t.id === selectedDateTime?.timeId)?.end}` : ""}
        />

        <CheckoutItem
            icon={<Banknote className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
            label="مبلغ"
            value={
                trends.find(t => t.id === SelectedTrend) ? trends.find(t => t.id === SelectedTrend)?.price?.toLocaleString("fa-IR") + " تومان" : ""
            }
        />



    </div>;
}

export default Checkout;