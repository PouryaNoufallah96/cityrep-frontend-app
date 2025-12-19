import { useEffect, useRef, useState } from "react";
import L from "@neshan-maps-platform/leaflet";
import "@neshan-maps-platform/leaflet/dist/leaflet.css";
import type { GymMock } from "~/routes/home";
import GymCard from "~/components/homepage/GymCard";
import { useNavigate } from "react-router";

type Props = {
    gyms: GymMock[]
}

const MapComponent = ({ gyms }: Props) => {
    const mapRef = useRef<L.Map | null>(null);
    const [selectedGym, setSelectedGym] = useState<any | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        if (mapRef.current) return;

        // init map
        mapRef.current = new L.Map("neshan-map", {
            key: "web.59e7c4d7f7ab4ab2a22c05b35fe88459",
            maptype: "neshan", // dark theme
            poi: false,
            traffic: false,
            center: [35.7214889, 51.3473951, 12.31],
            zoom: 11,
            zoomControl: false,
        } as any);

        // custom marker icon
        const gymIcon = L.icon({
            iconUrl: "/images/mapMarker.svg",
            iconSize: [56, 56],
            iconAnchor: [18, 36],
        });

        // add markers
        gyms.forEach((gym) => {
            const marker = L.marker([gym.location.lat, gym.location.lng], {
                icon: gymIcon,
            }).addTo(mapRef.current!);

            marker.on("click", () => {
                setSelectedGym(gym);
            });
        });
    }, []);

    return (
        <div className="w-screen max-w-xl h-[100svh] absolute top-0 left-0 z-[-1] text-white">
            {/* MAP */}
            <div id="neshan-map" className="w-full h-full relative z-[50]" />

            {/* Bottom Sheet */}
            {selectedGym && (
                <div className="absolute bottom-24 left-4 w-[calc(100%-32px)] z-[100]">
                    <GymCard
                        key={selectedGym.id}
                        image={"/images/mock/gymMock.jpg"}
                        title={selectedGym.title}
                        rating={selectedGym.rating}
                        genderLabel={selectedGym.genderLabel}
                        workingHours={selectedGym.workingHours}
                        address={selectedGym.address}
                        onClick={() => navigate(`gyms/${selectedGym.id}`)}
                        level="سطح طلایی"
                        variant="map"
                        handleBack={()=>setSelectedGym(undefined)}
                    />
                </div>

            )}
        </div>
    );
};

export default MapComponent;
