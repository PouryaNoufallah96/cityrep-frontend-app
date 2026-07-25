import { Map, Phone, Star, User } from "lucide-react";
import { Link, useParams } from "react-router";
import Navigator from "~/components/shared/Navigator";
import { getGoogleMapsDirectionUrl, getWeekGlobalMinPrice } from "~/lib/utils";
import Slider from "react-slick";
import { useRef, useState } from "react";
import GymLabel from "~/components/gymPage/GymLabel";
import { useGetGymBySlug } from "~/reactQuery/gym/hooks";
import { Spinner } from "~/components/ui/spinner";
import { useTranslation } from "react-i18next";
import { PaperPlane } from "react-coolicons";
import TrendIcon from "~/components/shared/TrendIcon";


const GymPage = () => {
    const { t } = useTranslation();
    const { gym_id } = useParams();
    const sliderRef = useRef<Slider>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const { data: gym, isLoading } = useGetGymBySlug(gym_id || "")
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
    if (isLoading) {
        return (
            <div className="flex h-[100svh] w-full items-center justify-center bg-[#2B2B2B]">
                <Spinner />
            </div>
        );
    }

    if (!gym) {
        return (
            <div className="flex h-[100svh] w-full flex-col bg-[#2B2B2B]">
                <Navigator className="px-4" title="باشگاه" />
                <div className="flex flex-1 items-center justify-center px-4 text-center text-white">
                    باشگاهی یافت نشد!
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[100svh] overflow-auto my-scroll bg-[#2B2B2B]">
            <div className="w-full h-[100svh] flex items-center justify-between flex-col">
                    <div className="w-full">
                        <Navigator className="px-4 sticky top-0 z-[10] bg-[#2B2B2B]" title={gym.title} leftComponent={
                            <div className="text-xs px-2 py-1 border border-secondary-main text-secondary-main fill-secondary-main flex items-center justify-center gap-2 w-max rounded-full">
                                {gym.rate}
                                <Star className="size-4 fill-secondary-main" />
                            </div>
                        } />
                        <div className="w-full relative">
                            <Slider
                                ref={sliderRef}
                                className="w-full mt-2"
                                {...settings}>
                                {
                                    gym?.images?.map((img) => (
                                        <div className="w-full aspect-[360/240]">
                                            <img className="w-full h-full object-cover rounded-lg" src={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + img.imageUrl} alt={gym.title} />
                                        </div>
                                    ))
                                }
                            </Slider>
                            <div className="w-full flex items-center justify-center gap-1 mt-2 absolute bottom-[30px]">
                                {
                                    gym.images.map((_, index) => (
                                        <div className={`h-[6px] rounded-full transition-all ${index === currentSlide ? "w-4 bg-primary-700" : "w-[6px] bg-white"}`} />
                                    ))
                                }
                            </div>
                            <div className="absolute flex items-center justify-center gap-3 right-4 -bottom-[14px]">
                                <Link
                                    to={getGoogleMapsDirectionUrl(
                                        gym.address.geoLocation.latitude,
                                        gym.address.geoLocation.longitude,
                                    )}
                                    target="_blank"
                                    aria-label={`مسیریابی به ${gym.title}`}
                                    className="w-11 h-11 rounded-full border border-secondary-main flex items-center justify-center bg-[#3B4533]"
                                >
                                    <PaperPlane className="text-secondary-main rotate-45" />
                                </Link>
                                <Link
                                    to={`tel:${gym.contact.phoneNumber}`}
                                    aria-label={`تماس با ${gym.title}`}
                                    className="w-11 h-11 rounded-full border border-secondary-main flex items-center justify-center bg-[#3B4533]"
                                >
                                    <Phone className="text-secondary-main" />
                                </Link>
                            </div>
                        </div>
                        <div className="mt-[54px] flex items-center justify-between px-4 text-[20px]">
                            <p className="text-primary-700">{gym.title}</p>
                            <p className="text-white">از {getWeekGlobalMinPrice(gym.weekPrices)?.toLocaleString("fa-IR")} تومان</p>
                        </div>



                        <div className="w-full mt-4 max-h-[calc(100svh-400px)] overflow-auto my-scroll px-4">
                            <GymLabel icon={<User />} label={gym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")} />
                            {/* <GymLabel icon={<Clock />} label={gym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")} /> */}
                            <GymLabel icon={<Phone />} label={gym.contact?.phoneNumber} />
                            <Link
                                to={getGoogleMapsDirectionUrl(
                                    gym.address.geoLocation.latitude,
                                    gym.address.geoLocation.longitude,
                                )}
                                target="_blank"
                                aria-label={`مسیریابی به ${gym.title}`}
                            >
                                <GymLabel icon={<Map />} label={gym.address.address} />
                            </Link>

                        </div>

                    </div>
                    <div className="w-full bg-[#121314] h-auto p-4 flex flex-col items-center justify-between">
                        <div className="mb-10 w-full">
                            <p className="text-secondary-main mb-6 font-medium">رشته های ورزشی</p>
                            <div className="flex flex-nowrap items-center gap-2 w-full max-w-screen overflow-x-auto my-scroll">
                                {
                                    gym.trends?.map((trend) => (

                                        <div key={trend.gymTrendId} className="flex flex-col items-center gap-2">
                                            <div className="w-16 h-16 bg-secondary-main/8 rounded-full flex items-center justify-center">
                                                <TrendIcon
                                                    title={trend.title}
                                                    fileId={trend.trendIconUrl}
                                                    className="w-6 h-6 object-contain text-secondary-main"
                                                />
                                            </div>
                                            <p className="text-white">
                                                {trend.title}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <Link to={`reserve`} className="text-white flex items-center justify-center font-medium w-full h-12 rounded-full bg-primary-main"> مشاهده زمان بندی</Link>
                    </div>

                </div>
        </div>
    )
}

export default GymPage;
