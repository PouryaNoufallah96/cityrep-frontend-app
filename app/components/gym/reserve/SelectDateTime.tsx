import { Check } from "lucide-react";
import { useState } from "react";
import { dateTimes } from "~/constants/mock";
import type { GymDateTime } from "~/types";

const SelectDateTime = ({
    setSelectedDateTime,
    selectedDateTime,
    errors
}: {
    setSelectedDateTime: ({ id, timeId }: { id: number, timeId: number }) => void,
    selectedDateTime: {
        id: number,
        timeId: number
    } | null,
    errors: string[]
}) => {
    const [selectedDate, setSelectedDate] = useState<GymDateTime>(dateTimes.find(dt => dt.id === selectedDateTime?.id) || dateTimes[0]);



    return <div className="w-full flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-4">
            {
                dateTimes.map(dateTime => (
                    <button className={`h-10 w-full border 
                        ${selectedDate.id === dateTime.id ? "bg-primary-700/12 border-primary-700/12 text-primary-700" : "text-white border-[#A0A0A0]"}
                         rounded-[12px] flex items-center justify-center text-sm`}
                        key={dateTime.id}
                        onClick={() => setSelectedDate(dateTime)}>
                        {dateTime.label}
                    </button>
                ))
            }
        </div>


        <div className="w-full flex flex-col gap-6">
            <div className="text-center text-[#E2DAFF]">
                {selectedDate.dateText}
            </div>
            <div className="w-full flex flex-col gap-3 overflow-x-auto my-scroll">
                {
                    selectedDate.times.map(time => (
                        <button onClick={() => {
                            setSelectedDateTime({
                                id: selectedDate.id,
                                timeId: time.id
                            });
                        }}
                            key={time.id + "-" + selectedDate.id}
                            className={`w-full border border-[#A0A0A0] rounded-[12px] p-3 flex justify-between items-center h-14 ${selectedDateTime?.timeId === time.id ? "bg-primary-700/12 border-primary-700" : "text-white"}`}>
                            <div className="flex gap-4">

                                <div className="text-white text-sm">
                                    {time.start} - {time.end}
                                </div>

                            </div>
                            <div className={`border ${selectedDateTime?.timeId === time.id ? "bg-primary-700 border-primary-700" : "border-[#A0A0A0]"} w-5 h-5 rounded-full border flex items-center justify-center`}>
                                {
                                    selectedDateTime?.timeId === time.id && <Check className="w-3 h-3" />
                                }
                            </div>

                        </button>
                    ))
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