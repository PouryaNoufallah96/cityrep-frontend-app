import { Clock, Map, Phone, Star, Trophy, User } from "lucide-react";
import { Link, useParams } from "react-router";
import Navigator from "~/components/shared/Navigator";
import { getGoogleMapsDirectionUrl, randomTehranLocation } from "~/lib/utils";
import Slider from "react-slick";
import { useRef, useState } from "react";
import GymLabel from "~/components/gymPage/GymLabel";
import { useGetOneGym } from "~/reactQuery/gym/hooks";
import { Spinner } from "~/components/ui/spinner";
import { useTranslation } from "react-i18next";


const GymPage = () => {
    const { t } = useTranslation();
    const { gym_id } = useParams();
    const sliderRef = useRef<Slider>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const { data: gym } = useGetOneGym({
        gymId: gym_id || ""
    })
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        arrows: false,
        beforeChange: (_: number, next: number) => {
            setCurrentSlide(next);
        },
        afterChange: (current: number) => setCurrentSlide(current)

    };
    return (
        <div className="w-full h-[100svh] bg-[#2B2B2B] px-4">
            {gym ?
                <>
                    <Navigator title={gym.title} leftComponent={
                        <div className="text-xs px-2 py-1 border border-secondary-main text-secondary-main fill-secondary-main flex items-center justify-center gap-2 w-max rounded-full">
                            {gym.rate}
                            <Star className="size-4 fill-secondary-main" />
                        </div>
                    } />
                    <Slider
                        ref={sliderRef}
                        className="w-full mt-2"
                        {...settings}>
                        {
                            gym?.images?.map((img) => (
                                <div className="w-full h-[240px]">
                                    <img className="w-full h-full object-cover rounded-lg" src={import.meta.env.VITE_BASE_API + "/api/v1/File/DownloadFile/" + img.imageUrl} alt={gym.title} />
                                </div>
                            ))
                        }
                    </Slider>
                    <div className="w-full flex items-center justify-center gap-1 mt-2">
                        {
                            gym.images.map((_, index) => (
                                <div className={`h-[6px] rounded-full transition-all ${index === currentSlide ? "w-4 bg-primary-700" : "w-[6px] bg-white"}`} />
                            ))
                        }
                    </div>

                    <div className="w-full mt-4 max-h-[calc(100svh-400px)] overflow-auto my-scroll">
                        <GymLabel icon={<User />} label={gym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")} />
                        <GymLabel icon={<Clock />} label={gym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")} />
                        <GymLabel icon={<Phone />} label={gym.contact?.phoneNumber} />
                        <GymLabel icon={<Map />} label={gym.address.address} />

                    </div>

                    <div className="w-full grid grid-cols-2 gap-2">
                        <Link to={getGoogleMapsDirectionUrl(gym.address.geoLocation.latitude, gym.address.geoLocation.longitude)} className="text-white flex items-center justify-center font-medium w-full h-12 rounded-full bg-primary-main">مسیریابی</Link>
                        <Link to={`tel:${gym.contact.phoneNumber}`} className="text-white flex items-center justify-center font-medium w-full h-12 rounded-full border border-white"> تماس</Link>

                    </div>
                </>
                :
                <div>
                    <Spinner />
                </div>
            }
        </div>
    )
}

export default GymPage;