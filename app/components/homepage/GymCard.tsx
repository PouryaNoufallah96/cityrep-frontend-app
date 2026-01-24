import { ArrowLeft, Clock, Map, StarIcon, User } from "lucide-react";

type GymCardProps = {
    image: string;
    title: string;
    rating: number;
    genderLabel: string;
    workingHours: string;
    address: string;
    onClick?: () => void;
    level: string;
    variant?: "map" | "list",
    price?: number;
    handleBack?: () => void;
};


const GymCard = ({
    image,
    title,
    rating,
    genderLabel,
    workingHours,
    address,
    onClick,
    level,
    price,
    variant = "list",
    handleBack
}: GymCardProps) => {
    return (
        <div
            onClick={onClick}
            className={`w-full cursor-pointer grid grid-cols-[140px_1fr]
        bg-[#2B2B2B] ${variant === "list" ? "h-[173px] min-h-[173px]" : "h-[190px] min-h-[190px]"} rounded-[12px] overflow-hidden`}
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

                    {variant === "list" ?
                        <div className="flex items-center gap-1 text-sm">
                            {/* <span>{rating}</span>
                        <StarIcon className="fill-primary-100 text-primary-100 h-4 w-4" /> */}
                        </div> :
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBack?.()
                        }} className="w-8 h-8 cursor-pointer rounded-full bg-secondary-main/16 text-secondary-main flex items-center justify-center">
                            <ArrowLeft />
                        </button>

                    }
                </div>
                {/* {variant === "map" &&
                    <div>
                        <StarIcon className="text-secondary-main fill-secondary-main h-4 w-4" />
                        <p className="text-xs">{rating}</p>
                    </div>} */}

                <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="fill-primary-100 text-primary-100 h-4 w-4" />
                    <span>{rating}</span>
                </div>
                <div>
                    <User className="text-primary-100 h-4 w-4" />
                    <p className="text-xs">{genderLabel}</p>
                </div>

                {/* <div>
                    <Clock className="text-secondary-main h-4 w-4" />
                    <p className="text-xs">{workingHours}</p>
                </div> */}

                 <div>
                    <Map className="text-primary-100 h-4 w-4" />
                    <p className="text-xs truncate max-w-[30vw]">{address}</p>
                </div>
                <div className="text-secondary-main font-bold flex items-center justify-center rounded-full w-max">
                   از {(price)?.toLocaleString("fa-IR")} تومان
                </div>
            </div>
        </div>
    );
};

export default GymCard;
