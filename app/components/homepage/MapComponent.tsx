import { useEffect, useMemo, useRef, useState } from "react";
import L from "@neshan-maps-platform/leaflet";
import "@neshan-maps-platform/leaflet/dist/leaflet.css";
import GymCard from "~/components/homepage/GymCard";
import { useNavigate } from "react-router";
import type { GymDiscoveryFilter, GymFilter, GymResult } from "~/reactQuery/gym/services";
import { useGetGymsWithFilter } from "~/reactQuery/gym/hooks";
import { useDebounce } from "~/hooks/useDebounce";
import { boundsToNearestFilter, getWeekGlobalMinPrice } from "~/lib/utils";
import { useTranslation } from "react-i18next";


type MapComponentProps = {
    filters: GymDiscoveryFilter;
};

const MapComponent = ({ filters }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const { t } = useTranslation();
    const [selectedGym, setSelectedGym] = useState<GymResult | null>(null);
    const navigate = useNavigate()
    const [nearest, setNearest] = useState<GymFilter["nearest"]>();
    const [mapRevision, setMapRevision] = useState(0);

    const debouncedNearest = useDebounce(nearest, 600);
    const queryFilters = useMemo<GymFilter>(() => ({
        ...filters,
        nearest: debouncedNearest,
        pagination: { page: 1, size: 20 },
    }), [debouncedNearest, filters]);

    const { data: gyms } = useGetGymsWithFilter(queryFilters);

    useEffect(() => {
        if (mapRef.current) return;

        let isMounted = true;
        const handleMaptypeSwitched = () => {
            if (isMounted) {
                setMapRevision((value) => value + 1);
            }
        };
        const map = new L.Map("neshan-map", {
            key: "web.59e7c4d7f7ab4ab2a22c05b35fe88459",
            maptype: "neshan",
            poi: false,
            traffic: false,
            center: [35.7214889, 51.3473951],
            zoom: 11,
            zoomControl: false,
            onMaptypeSwitched: handleMaptypeSwitched,
        } as any);

        mapRef.current = map;
        setMapRevision((value) => value + 1);

        setNearest(boundsToNearestFilter(map));

        const handleMoveEnd = () => {
            setNearest(boundsToNearestFilter(map));
        };
        map.on("moveend", handleMoveEnd);

        return () => {
            isMounted = false;
            map.off("moveend", handleMoveEnd);
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            map.remove();
            if (mapRef.current === map) {
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        setSelectedGym(null);
    }, [filters]);

    useEffect(() => {
        if (!mapRef.current) return;

        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        if (!gyms?.data?.data) return;

        gyms.data.data.forEach((gym) => {
            const markerLabel = gym.state === "Inactive"
                ? `${gym.title}، غیرفعال`
                : gym.title;
            const marker = L.marker(
                [
                    gym.address.geoLocation.latitude,
                    gym.address.geoLocation.longitude,
                ],
                {
                    icon: L.divIcon({
                        className: gym.state === "Active"
                            ? "rounded-full bg-primary-main"
                            : "rounded-full bg-text-300",
                        iconSize: [18, 18],
                        iconAnchor: [9, 9],
                    }),
                    title: markerLabel,
                }
            ).addTo(mapRef.current!);

            marker.getElement()?.setAttribute("aria-label", markerLabel);
            marker.on("click", () => setSelectedGym(gym));
            markersRef.current.push(marker);
        });
    }, [gyms, mapRevision]);


    return (
        <div className="w-screen max-w-xl h-[100svh] absolute top-0 left-0 z-0 text-white">
            <div id="neshan-map" className="w-full h-full relative z-[50]" />

            {selectedGym && (
                <div className="absolute bottom-24 left-4 w-[calc(100%-32px)] z-[100]">
                    <GymCard
                        key={selectedGym.gymId}
                        image={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + selectedGym.images?.[0].imageUrl}
                        title={selectedGym.title}
                        rating={selectedGym.rate}
                        rateCount={selectedGym.rateCount}
                        genderLabel={selectedGym.supportedGender.map((g) => t("gym.gender." + g)).join(", ")}
                        workingHours={selectedGym.gymTotalWorkingHour.filter((h) => !h.isClosed).map((h) => t("week." + h.dayOfWeek)).join(", ")}
                        address={selectedGym.address.address}
                        onClick={selectedGym.state === "Inactive" ? undefined : () => navigate(`gyms/${selectedGym.slug}`)}
                        disabled={selectedGym.state === "Inactive"}
                        level={t("gym.level." + selectedGym.level)}
                        variant="map"
                        price={getWeekGlobalMinPrice(selectedGym.weekPrices)}
                        handleBack={() => setSelectedGym(null)}
                    />
                </div>

            )}
        </div>
    );
};

export default MapComponent;
