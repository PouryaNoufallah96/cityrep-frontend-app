import { Clock, Map, StarIcon, User } from "lucide-react";

type GymCardProps = {
    image: string;
    title: string;
    rating: number;
    genderLabel: string;
    workingHours: string;
    address: string;
    onClick?: () => void;
    level: string;
};


const GymCard = ({
    image,
    title,
    rating,
    genderLabel,
    workingHours,
    address,
    onClick,
    level
}: GymCardProps) => {
    return (
        <div
            onClick={onClick}
            className="w-full cursor-pointer grid grid-cols-[140px_1fr]
        bg-[#2B2B2B] h-[173px] min-h-[173px] rounded-[12px] overflow-hidden"
        >
            {/* Image */}
            <div className="w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-r-[12px]"
                />
            </div>

            {/* Content */}
            <div className="w-full text-white p-4 flex flex-col gap-3
        [&>div]:flex [&>div]:items-center [&>div]:gap-2"
            >
                <div className="w-full justify-between">
                    <p className="text-primary-700 font-bold truncate">{title}</p>

                    <div className="flex items-center gap-1 text-sm">
                        <span>{rating}</span>
                        <StarIcon className="fill-primary-100 text-primary-100 h-4 w-4" />
                    </div>
                </div>

                <div>
                    <User className="text-secondary-main h-4 w-4" />
                    <p className="text-xs">{genderLabel}</p>
                </div>

                <div>
                    <Clock className="text-secondary-main h-4 w-4" />
                    <p className="text-xs">{workingHours}</p>
                </div>

                <div>
                    <Map className="text-secondary-main h-4 w-4" />
                    <p className="text-xs truncate">{address}</p>
                </div>
                <div className="border border-primary-100 bg-primary-100/14 flex items-center justify-center text-white rounded-full w-max px-2 py-1 text-xs">
                    {level}
                </div>
            </div>
        </div>
    );
};

export default GymCard;
