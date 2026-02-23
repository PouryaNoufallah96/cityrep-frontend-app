import { ArrowLeft, Clock, Map, StarIcon, User } from "lucide-react";

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
            className={`w-full grid grid-cols-[140px_1fr] p-3
        bg-[#2B2B2B] h-[173px] max-h-[173px] min-h-[173px] rounded-[12px]`}
        >
            {/* Image */}
            <div className="w-full h-[149px]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-r-[12px]"
                />
            </div>

            {/* Content */}
            <div className="w-full h-full text-white px-4 py-2 flex flex-col gap-4
        [&>div]:flex [&>div]:items-center [&>div]:gap-2"
            >
                <div className="w-full justify-between">
                    <p className="text-primary-700 font-bold truncate">{title}</p>
                </div>


                <div>
                    <Clock className="text-secondary-main h-4 w-4" />
                    <p className="text-xs">{date}</p>
                </div>

                <div>
                    <Map className="text-secondary-main h-4 w-4" />
                    <p className="text-xs truncate max-w-[30vw]">{address}</p>
                </div>
                <button
                    onClick={handleRate}
                    className="cursor-pointer border border-primary-100 bg-primary-100/14 flex items-center justify-center text-white rounded-full w-max px-2 py-1 text-xs">
                    امتیاز دهید
                </button>
            </div>
        </div>
    );
};

export default GymHistoryCard;
