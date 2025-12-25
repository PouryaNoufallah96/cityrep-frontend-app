import { useEffect, useRef, useState } from "react";
import L from "@neshan-maps-platform/leaflet";
import "@neshan-maps-platform/leaflet/dist/leaflet.css";
import GymCard from "~/components/homepage/GymCard";
import { useNavigate } from "react-router";
import type { GymFilter, GymResult } from "~/reactQuery/gym/services";
import { useGetGymsWithFilter } from "~/reactQuery/gym/hooks";
import { useDebounce } from "~/hooks/useDebounce";
import { boundsToNearestFilter } from "~/lib/utils";
import { useTranslation } from "react-i18next";


const MapComponent = () => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const { t } = useTranslation();
    const [selectedGym, setSelectedGym] = useState<GymResult | null>(null);
    const navigate = useNavigate()
    const [filters, setFilters] = useState<GymFilter>({});

    // 🔹 debounce map-based filters
    const debouncedFilters = useDebounce(filters, 600);

    // 🔹 fetch gyms
    const { data: gyms } = useGetGymsWithFilter(debouncedFilters);

    useEffect(() => {
        if (mapRef.current) return;

        const map = new L.Map("neshan-map", {
            key: "web.59e7c4d7f7ab4ab2a22c05b35fe88459",
            maptype: "neshan",
            poi: false,
            traffic: false,
            center: [35.7214889, 51.3473951],
            zoom: 11,
            zoomControl: false,
        } as any);

        mapRef.current = map;

        // 🔹 initial filter from map view
        setFilters({
            nearest: boundsToNearestFilter(map),
            pagination: { page: 1, size: 20 },
        });

        // 🔹 update filter when map stops moving
        map.on("moveend", () => {
            setFilters((prev) => ({
                ...prev,
                nearest: boundsToNearestFilter(map),
            }));
        });
    }, []);

    /* =======================
       Render markers
    ======================= */
    useEffect(() => {
        if (!mapRef.current || !gyms?.data?.data) return;

        // clear old markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        const gymIcon = L.icon({
            iconUrl: "/images/mapMarker.svg",
            iconSize: [56, 56],
            iconAnchor: [18, 36],
        });

        gyms.data.data.forEach((gym) => {
            const marker = L.marker(
                [
                    gym.address.geoLocation.latitude,
                    gym.address.geoLocation.longitude,
                ],
                { icon: gymIcon }
            ).addTo(mapRef.current!);

            marker.on("click", () => setSelectedGym(gym));
            markersRef.current.push(marker);
        });
    }, [gyms]);


    return (
        <div className="w-screen max-w-xl h-[100svh] absolute top-0 left-0 z-[-1] text-white">
            {/* MAP */}
            <div id="neshan-map" className="w-full h-full relative z-[50]" />

            {/* Bottom Sheet */}
            {selectedGym && (
                <div className="absolute bottom-24 left-4 w-[calc(100%-32px)] z-[100]">
                    <GymCard
                        key={selectedGym.gymId}
                        image={import.meta.env.VITE_BASE_API + "/api/v1/File/DownloadFile/" + selectedGym.images?.[0].imageUrl}
                        title={selectedGym.title}
                        rating={selectedGym.rate}
                        genderLabel={selectedGym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")}
                        workingHours={selectedGym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")}
                        address={selectedGym.address.address}
                        onClick={() => navigate(`gyms/${selectedGym.gymId}`)}
                        level={t("gym.level." + selectedGym.level)}
                        variant="map"
                        handleBack={() => setSelectedGym(null)}
                    />
                </div>

            )}
        </div>
    );
};

export default MapComponent;
