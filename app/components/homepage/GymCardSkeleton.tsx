import { Skeleton } from "~/components/ui/skeleton";

export const GymCardSkeleton = () => {
    return (
        <div className="w-full grid grid-cols-[140px_1fr] bg-[#2B2B2B] h-[173px] min-h-[173px] rounded-[12px] overflow-hidden">
            {/* Image Placeholder */}
            <div className="w-full h-full">
                <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Content Placeholders */}
            <div className="w-full p-4 flex flex-col justify-between">
                <div>
                    {/* Title */}
                    <Skeleton className="w-[70%] h-5 mb-4" />

                    {/* Meta info rows */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-8 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-16 h-4" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div>
                    <Skeleton className="w-20 h-5" />
                </div>
            </div>
        </div>
    );
};
