import { Clock, Filter, Map, MapPin, Search, Star, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import GymCard from "~/components/homepage/GymCard";
import SearchInput from "~/components/ui/SearchInput";
import { randomTehranLocation } from "~/lib/utils";

export type GymMock = {
    id: number;
    image: string;
    title: string;
    rating: number;
    genderLabel: string;
    workingHours: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
};

export const gymsMock: GymMock[] = [
    {
        id: 1,
        image: "/images/mock/gym1.jpg",
        title: "باشگاه انقلاب",
        rating: 4.2,
        genderLabel: "مخصوص آقایان",
        workingHours: "۰۷:۰۰ تا ۲۳:۰۰",
        address: "تهران، شریعتی، بعد از قبا",
        location: randomTehranLocation(),
    },
    {
        id: 2,
        image: "/images/mock/gym2.jpg",
        title: "باشگاه بانوان الماس",
        rating: 4.8,
        genderLabel: "مخصوص بانوان",
        workingHours: "۰۸:۰۰ تا ۲۲:۰۰",
        address: "تهران، ونک، ملاصدرا",
        location: randomTehranLocation(),
    },
    {
        id: 3,
        image: "/images/mock/gym3.jpg",
        title: "باشگاه آرتمیس",
        rating: 4.1,
        genderLabel: "مختلط",
        workingHours: "۰۶:۳۰ تا ۲۳:۳۰",
        address: "تهران، سعادت‌آباد",
        location: randomTehranLocation(),
    },
    {
        id: 4,
        image: "/images/mock/gym4.jpg",
        title: "باشگاه پاور فیت",
        rating: 3.9,
        genderLabel: "مخصوص آقایان",
        workingHours: "۰۹:۰۰ تا ۲۲:۰۰",
        address: "تهران، تهرانپارس",
        location: randomTehranLocation(),
    },
    {
        id: 5,
        image: "/images/mock/gym5.jpg",
        title: "باشگاه فیت لایف",
        rating: 4.6,
        genderLabel: "مختلط",
        workingHours: "۰۷:۰۰ تا ۲۴:۰۰",
        address: "تهران، شهرک غرب",
        location: randomTehranLocation(),
    },
    {
        id: 6,
        image: "/images/mock/gym6.jpg",
        title: "باشگاه بانوان نیلوفر",
        rating: 4.3,
        genderLabel: "مخصوص بانوان",
        workingHours: "۰۸:۰۰ تا ۲۱:۳۰",
        address: "تهران، پیروزی",
        location: randomTehranLocation(),
    },
    {
        id: 7,
        image: "/images/mock/gym7.jpg",
        title: "باشگاه قهرمانان",
        rating: 3.7,
        genderLabel: "مخصوص آقایان",
        workingHours: "۱۰:۰۰ تا ۲۲:۰۰",
        address: "تهران، نازی‌آباد",
        location: randomTehranLocation(),
    },
    {
        id: 8,
        image: "/images/mock/gym8.jpg",
        title: "باشگاه اسپرت پلاس",
        rating: 4.9,
        genderLabel: "مختلط",
        workingHours: "۰۶:۰۰ تا ۲۴:۰۰",
        address: "تهران، الهیه",
        location: randomTehranLocation(),
    },
    {
        id: 9,
        image: "/images/mock/gym9.jpg",
        title: "باشگاه بانوان یاس",
        rating: 4.0,
        genderLabel: "مخصوص بانوان",
        workingHours: "۰۹:۰۰ تا ۲۱:۰۰",
        address: "تهران، صادقیه",
        location: randomTehranLocation(),
    },
    {
        id: 10,
        image: "/images/mock/gym10.jpg",
        title: "باشگاه فیت‌زون",
        rating: 4.4,
        genderLabel: "مختلط",
        workingHours: "۰۷:۳۰ تا ۲۳:۳۰",
        address: "تهران، جردن",
        location: randomTehranLocation(),
    },
    {
        id: 11,
        image: "/images/mock/gym11.jpg",
        title: "باشگاه آتلانتیک",
        rating: 3.8,
        genderLabel: "مخصوص آقایان",
        workingHours: "۰۸:۰۰ تا ۲۲:۳۰",
        address: "تهران، ستارخان",
        location: randomTehranLocation(),
    },
    {
        id: 12,
        image: "/images/mock/gym12.jpg",
        title: "باشگاه بانوان مهتاب",
        rating: 4.7,
        genderLabel: "مخصوص بانوان",
        workingHours: "۰۸:۰۰ تا ۲۲:۰۰",
        address: "تهران، پاسداران",
        location: randomTehranLocation(),
    },
];


export default function Home() {
    const [search, setSearch] = useState<string>("")
    const navigate = useNavigate()
    return (
        <div className="pt-4 w-full">
            <div className="w-full flex items-center justify-between">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <Filter />
                    </button>
                    <button className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <MapPin />
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 my-4 my-scroll h-[calc(100svh-100px)] overflow-auto">
                {gymsMock.map((gym) => (
                    <GymCard
                        key={gym.id}
                        image={"/images/mock/gymMock.jpg"}
                        title={gym.title}
                        rating={gym.rating}
                        genderLabel={gym.genderLabel}
                        workingHours={gym.workingHours}
                        address={gym.address}
                        onClick={() => navigate(`gyms/${gym.id}`)}
                        level="سطح طلایی"
                    />
                ))}

            </div>


        </div>
    )
}
