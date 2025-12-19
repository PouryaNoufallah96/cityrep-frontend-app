import { Clock, Map, Phone, Star, Trophy, User } from "lucide-react";
import { Link, useParams } from "react-router";
import Navigator from "~/components/shared/Navigator";
import { getGoogleMapsDirectionUrl, randomTehranLocation } from "~/lib/utils";
import Slider from "react-slick";
import { useRef, useState } from "react";
import GymLabel from "~/components/gymPage/GymLabel";
import { Button } from "~/components/ui/button";

const gym = {
    id: 8,
    image: "/images/mock/gymMock.jpg",
    title: "باشگاه اسپرت پلاس",
    rating: 4.9,
    genderLabel: "مختلط",
    workingHours: "۰۶:۰۰ تا ۲۴:۰۰",
    address: "شریعی، بعد از قبا، میثاق پنجم، بالاتر از مجتمع تجاری، پلاک۲",
    location: randomTehranLocation(),
    images: [
        "/images/mock/gymMock.jpg", "/images/mock/gymMock.jpg", "/images/mock/gymMock.jpg", "/images/mock/gymMock.jpg",
    ],
    level: "سطح طلایی",
    phone: "021123455"
}
const GymPage = () => {
    const { gym_id } = useParams();
    const sliderRef = useRef<Slider>(null)
    const [currentSlide, setCurrentSlide] = useState(0)

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
            <Navigator title={gym.title} leftComponent={
                <div className="text-xs px-2 py-1 border border-secondary-main text-secondary-main fill-secondary-main flex items-center justify-center gap-2 w-max rounded-full">
                    {gym.rating}
                    <Star className="size-4 fill-secondary-main" />
                </div>
            } />
            <Slider
                ref={sliderRef}
                className="w-full mt-2"
                {...settings}>
                {
                    gym.images.map((img) => (
                        <div className="w-full h-[240px]">
                            <img className="w-full h-full object-cover rounded-lg" src={img} alt={gym.title} />
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
                <GymLabel icon={<User />} label={gym.genderLabel} />
                <GymLabel icon={<Clock />} label={gym.workingHours} />
                <GymLabel icon={<Phone />} label={gym.phone} />
                <GymLabel icon={<Map />} label={gym.address} />

            </div>

            <div className="w-full grid grid-cols-2 gap-2">
                <Link to={getGoogleMapsDirectionUrl(gym.location.lat, gym.location.lng)} className="text-white flex items-center justify-center font-medium w-full h-12 rounded-full bg-primary-main">مسیریابی</Link>
                <Link to={`tel:${gym.phone}`} className="text-white flex items-center justify-center font-medium w-full h-12 rounded-full border border-white"> تماس</Link>

            </div>
        </div>
    )
}

export default GymPage;