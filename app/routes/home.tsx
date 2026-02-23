import { Filter, List, Map, MapPin, Search, Star, User } from "lucide-react";
import { useState } from "react";
import MapComponent from "~/components/homepage/MapComponent"
import { useNavigate } from "react-router";
import GymCard from "~/components/homepage/GymCard";
import SearchInput from "~/components/ui/SearchInput";
import { GymCardSkeleton } from "~/components/homepage/GymCardSkeleton";
import { useGetGymsWithFilter } from "~/reactQuery/gym/hooks";
import { useTranslation } from "react-i18next";
import { getWeekGlobalMinPrice } from "~/lib/utils";
import { useDebounce } from "~/hooks/useDebounce";
import type { Gender, GymLevel } from "~/types";
import { HomeFilterSheet } from "~/components/homepage/HomeFilterSheet";





export default function Home() {
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 500)

    // Filter states
    const [selectedGenders, setSelectedGenders] = useState<Gender[]>([])
    const [selectedLevels, setSelectedLevels] = useState<GymLevel[]>([])

    const [showType, setShowType] = useState<"list" | "map">("list")
    const navigate = useNavigate()
    const { data: gyms, isLoading } = useGetGymsWithFilter({
        pagination: {
            page: 1,
            size: 20
        },
        search: debouncedSearch || undefined,
        genders: selectedGenders.length > 0 ? selectedGenders : undefined,
        gymLevels: selectedLevels.length > 0 ? selectedLevels : undefined
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

        return gyms.data.data.map((gym) => (
            <GymCard
                key={gym.gymId}
                image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + gym.images?.[0].imageUrl}
                title={gym.title}
                rating={gym.rate}
                genderLabel={gym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")}
                workingHours={gym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")}
                address={gym.address.address}
                onClick={() => navigate(`gyms/${gym.slug}`)}
                level={t("gym.level." + gym.level)}
                price={getWeekGlobalMinPrice(gym.weekPrices)}
            />
        ));
    };

    return (
        <div className="pt-4 w-full h-full">
            <div className="w-full flex items-center justify-between">
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

                    <MapComponent />
            }


        </div>
    )
}
