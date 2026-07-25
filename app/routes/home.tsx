import { Check, List, MapPin, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import MapComponent from "~/components/homepage/MapComponent";
import { useLocation, useNavigate } from "react-router";
import GymCard from "~/components/homepage/GymCard";
import SearchInput from "~/components/ui/SearchInput";
import { GymCardSkeleton } from "~/components/homepage/GymCardSkeleton";
import { useGetGymsWithFilter } from "~/reactQuery/gym/hooks";
import { useTranslation } from "react-i18next";
import { getWeekGlobalMinPrice } from "~/lib/utils";
import { useDebounce } from "~/hooks/useDebounce";
import type { Gender, GymLevel } from "~/types";
import { HomeFilterSheet } from "~/components/homepage/HomeFilterSheet";
import type { GymDiscoveryFilter } from "~/reactQuery/gym/services";

type HomeLocationState = {
    ratingSuccessTitle?: string;
};

export default function Home() {
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 500)

    // Filter states
    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([])
    const [selectedLevels, setSelectedLevels] = useState<GymLevel[]>([])

    const [showType, setShowType] = useState<"list" | "map">("list")
    const navigate = useNavigate()
    const location = useLocation()
    const ratingSuccessTitle = (location.state as HomeLocationState | null)?.ratingSuccessTitle
    const [isRatingBannerDismissed, setIsRatingBannerDismissed] = useState(false)
    const showRatingSuccessBanner = !!ratingSuccessTitle && !isRatingBannerDismissed
    const discoveryFilters = useMemo<GymDiscoveryFilter>(() => ({
        search: debouncedSearch || undefined,
        genders: selectedGenders.length > 0 ? selectedGenders : undefined,
        gymLevels: selectedLevels.length > 0 ? selectedLevels : undefined
    }), [debouncedSearch, selectedGenders, selectedLevels])
    const { data: gyms, isLoading } = useGetGymsWithFilter({
        ...discoveryFilters,
        pagination: {
            page: 1,
            size: 20
        }
    })
    const { t } = useTranslation();

    const renderListContent = () => {
        if (isLoading) {
            return (
                <>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <GymCardSkeleton key={i} />
                    ))}
                </>
            );
        }

        if (!gyms?.data?.data || gyms.data.data.length === 0) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">
                    <div className="w-24 h-24 bg-[#2B2B2B] rounded-full flex items-center justify-center mb-6">
                        <MapPin className="text-secondary-main w-10 h-10 opacity-70" />
                    </div>
                    <p className="text-white font-bold text-lg mb-2">باشگاهی یافت نشد!</p>
                    <p className="text-white/50 text-sm max-w-[250px]">
                        با تغییر فیلترها یا جستجوی نام دیگر، دوباره امتحان کنید.
                    </p>
                </div>
            );
        }

        return gyms.data.data.map((gym) => {
            const isInactive = gym.state === "Inactive";

            return (
                <GymCard
                    key={gym.gymId}
                    image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + gym.images?.[0].imageUrl}
                    title={gym.title}
                    rating={gym.rate}
                    rateCount={gym.rateCount}
                    genderLabel={gym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")}
                    workingHours={gym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")}
                    address={gym.address.address}
                    onClick={isInactive ? undefined : () => navigate(`gyms/${gym.slug}`)}
                    disabled={isInactive}
                    level={t("gym.level." + gym.level)}
                    price={getWeekGlobalMinPrice(gym.weekPrices)}
                />
            );
        });
    };

    return (
        <div className="pt-4 w-full h-full">
            {showRatingSuccessBanner && (
                <div
                    role="status"
                    className="mb-4 flex min-h-14 w-full items-center gap-3 rounded-lg bg-success px-4 py-3 text-white"
                >
                    <Check
                        aria-hidden="true"
                        className="size-5 shrink-0 rounded-full bg-white p-0.5 text-success"
                    />
                    <p className="min-w-0 flex-1 text-sm font-medium leading-7">
                        امتیاز «{ratingSuccessTitle}» با موفقیت ثبت شد.
                    </p>
                    <button
                        type="button"
                        aria-label="بستن پیام موفقیت امتیاز"
                        className="flex size-8 shrink-0 items-center justify-center"
                        onClick={() => {
                            setIsRatingBannerDismissed(true)
                            navigate(".", { replace: true, state: null })
                        }}
                    >
                        <XIcon aria-hidden="true" className="size-5" />
                    </button>
                </div>
            )}
            <div className="relative z-[60] w-full flex items-center justify-between">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex items-center gap-4">
                    {showType === "list" && (
                        <HomeFilterSheet
                            selectedGenders={selectedGenders}
                            setSelectedGenders={setSelectedGenders}
                            selectedLevels={selectedLevels}
                            setSelectedLevels={setSelectedLevels}
                        />
                    )}
                    <button onClick={() => {
                        setShowType(showType === "map" ? "list" : "map")
                    }}
                        className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        {showType === "map" ? <List /> : <MapPin />}
                    </button>
                </div>
            </div>
            {
                showType === "list" ?
                    <div className="w-full flex flex-col gap-4 my-4 pb-[90px] my-scroll h-[calc(100svh-100px)] overflow-auto">
                        {renderListContent()}
                    </div>
                    :

                    <MapComponent filters={discoveryFilters} />
            }


        </div>
    )
}
