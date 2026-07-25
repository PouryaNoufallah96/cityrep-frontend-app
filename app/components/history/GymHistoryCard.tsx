import { ChevronLeft, Clock, Map } from "lucide-react";

type GymCardProps = {
    image: string;
    title: string;
    date: string;
    address: string;
    handleRate?: () => void;
};


const GymHistoryCard = ({
    image,
    title,
    date,
    handleRate,
    address,
}: GymCardProps) => {
    return (
        <div
            className={`w-full grid grid-cols-[140px_minmax(0,1fr)] p-3
        bg-[#2B2B2B] min-h-[149px] rounded-[12px]`}
        >
            <div className="w-full h-[125px]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-[8px]"
                />
            </div>

            <div className="w-full min-w-0 text-white px-4 py-1 flex flex-col gap-3
        [&>div]:flex [&>div]:items-center [&>div]:gap-2"
            >
                <div className="w-full justify-between">
                    <p className="text-primary-700 font-bold truncate">{title}</p>
                </div>

                <div>
                    <Clock className="text-secondary-main h-4 w-4 shrink-0" />
                    <p className="text-xs truncate">{date}</p>
                </div>

                <div>
                    <Map className="text-secondary-main h-4 w-4 shrink-0" />
                    <p className="text-xs truncate max-w-[30vw]">{address}</p>
                </div>
                {handleRate && (
                    <button
                        type="button"
                        onClick={handleRate}
                        className="cursor-pointer border border-white/80 flex items-center justify-center gap-1 text-white rounded-full w-max px-3 py-1 text-xs"
                    >
                        امتیاز دهید
                        <ChevronLeft className="size-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default GymHistoryCard;
