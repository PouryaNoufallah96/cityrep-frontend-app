import {useState} from "react";
import GymHistoryCard from "~/components/history/GymHistoryCard";
import RateSheet from "~/components/history/RateSheet";
import {toast} from "sonner";

export type GymMock = {
    id: number;
    image: string;
    title: string;
    date: string;
    address: string;
};

export const gymsMock: GymMock[] = [
    {
        id: 1,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 2,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 3,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 4,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 5,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 6,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 7,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },
    {
        id: 8,
        image: "/images/mock/gymMock.jpg",
        title: "باشگاه انقلاب",
        date: "دوشنبه ۲۵ آذر | ۱۲:۳۰",
        address: "تهران، شریعتی، بعد از قبا",
    },

];


export default function HistoryPage() {
    const [selectedGym, setSelectedGym] = useState<GymMock>();
    return (
        <div className="pt-4 w-full">

            <div className="w-full flex flex-col gap-4 my-4 my-scroll h-[calc(100svh-100px)] overflow-auto">
                {gymsMock.map((gym) => (
                    <GymHistoryCard
                        key={gym.id}
                        image={"/images/mock/gymMock.jpg"}
                        title={gym.title}
                        date={gym.date}
                        address={gym.address}
                        handleRate={() => {
                            setSelectedGym(gym)
                        }}
                    />
                ))}

            </div>

            {selectedGym && <RateSheet
                handleRate={(rate)=>{
                    console.log("rate", rate);
                    toast.success(`امتیاز باشگاه ${selectedGym?.title} ثبت شد`)

                    setSelectedGym(undefined)
                }}
                image={selectedGym?.image} title={selectedGym?.title} open={!!selectedGym}
                handleOpenChange={() => setSelectedGym(undefined)}/>}

        </div>
    )
}
