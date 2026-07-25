import { ArrowLeft, Map, StarIcon, User } from "lucide-react";
import { cn } from "~/lib/utils";

type GymCardProps = {
    image: string;
    title: string;
    rating: number;
    rateCount: number;
    genderLabel: string;
    workingHours: string;
    address: string;
    onClick?: () => void;
    level: string;
    variant?: "map" | "list";
    price?: number;
    handleBack?: () => void;
    disabled?: boolean;
};

const GymCard = ({
    image,
    title,
    rating,
    genderLabel,
    address,
    onClick,
    price,
    variant = "list",
    handleBack,
    disabled = false,
}: GymCardProps) => {
    return (
        <div
            onClick={disabled ? undefined : onClick}
            onKeyDown={(event) => {
                if (event.target === event.currentTarget && !disabled && onClick && event.key === "Enter") {
                    onClick();
                }
            }}
            role={variant === "map" && disabled ? "group" : onClick || disabled ? "link" : undefined}
            tabIndex={disabled ? (variant === "list" ? -1 : undefined) : onClick ? 0 : undefined}
            aria-disabled={variant === "list" && disabled ? true : undefined}
            aria-label={disabled ? `${title}، غیرفعال` : undefined}
            className={cn(
                `w-full grid grid-cols-[140px_minmax(0,1fr)] bg-[#2B2B2B] ${variant === "list" ? "h-[173px] min-h-[173px]" : "h-[190px] min-h-[190px]"} rounded-[12px] overflow-hidden`,
                disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
        >
            <div className="w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-r-[12px]"
                />
            </div>

            <div className="w-full text-white p-4 flex flex-col gap-3
        [&>div]:flex [&>div]:items-center [&>div]:gap-2"
            >
                <div className="w-full justify-between">
                    <p className="min-w-0 flex-1 text-primary-700 font-bold truncate">{title}</p>

                    {variant === "map" ? (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBack?.();
                            }}
                            aria-label="بازگشت به نقشه"
                            className="flex size-8 shrink-0 cursor-pointer items-center justify-center text-primary-700"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                    ) : (
                        !disabled && (
                            <ArrowLeft className="size-5 shrink-0 text-primary-700" aria-hidden />
                        )
                    )}
                </div>

                <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="h-4 w-4 fill-primary-100 text-primary-100" />
                    <span>{rating}</span>
                </div>
                <div>
                    <User className="text-primary-100 h-4 w-4" />
                    <p className="text-xs">{genderLabel}</p>
                </div>

                <div>
                    <Map className="text-primary-100 h-4 w-4" />
                    <p className="text-xs truncate max-w-[30vw]">{address}</p>
                </div>
                <div className="mt-auto w-full min-w-0">
                    <span className="min-w-0 truncate text-secondary-main font-bold">
                        از {(price)?.toLocaleString("fa-IR")} تومان
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GymCard;
