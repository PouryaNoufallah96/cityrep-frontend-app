import {Filter, List, Map, MapPin, Search, Star, User} from "lucide-react";
import {useState} from "react";
import MapComponent from "~/components/homepage/MapComponent"
import {useNavigate} from "react-router";
import GymCard from "~/components/homepage/GymCard";
import SearchInput from "~/components/ui/SearchInput";
import {useGetGymsWithFilter} from "~/reactQuery/gym/hooks";
import {useTranslation} from "react-i18next";
import { getWeekGlobalMinPrice } from "~/lib/utils";





export default function Home() {
    const [search, setSearch] = useState<string>("")
    const [showType, setShowType] = useState<"list" | "map">("list")
    const navigate = useNavigate()
    const {data: gyms} = useGetGymsWithFilter({
        pagination:{
            page:1,
            size:20
        }
    })
    const {t} = useTranslation();

    return (
        <div className="pt-4 w-full">
            <div className="w-full flex items-center justify-between">
                <SearchInput value={search} onChange={setSearch}/>
                <div className="flex items-center gap-4">
                    {showType === "list" && <button
                        className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <Filter/>
                    </button>}
                    <button onClick={() => {
                        setShowType(showType === "map" ? "list" : "map")
                    }}
                            className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        {showType === "map" ? <List/> : <MapPin/>}
                    </button>
                </div>
            </div>
            {
                showType === "list" ?
                    <div className="w-full flex flex-col gap-4 my-4 pb-[90px] my-scroll h-[calc(100svh-100px)] overflow-auto">
                        {gyms?.data?.data.map((gym) => (
                            <GymCard
                                key={gym.gymId}
                                image={import.meta.env.VITE_BASE_API+"/File/DownloadFile/"+gym.images?.[0].imageUrl}
                                title={gym.title}
                                rating={gym.rate}
                                genderLabel={gym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")}
                                workingHours={gym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")}
                                address={gym.address.address}
                                onClick={() => navigate(`gyms/${gym.slug}`)}
                                level={t("gym.level." + gym.level)}
                                price={getWeekGlobalMinPrice(gym.weekPrices)}
                            />
                        ))}

                    </div>
                    :

                    <MapComponent/>
            }


        </div>
    )
}
