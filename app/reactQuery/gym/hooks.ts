import { useMutation, useQuery } from "@tanstack/react-query";
import {
    gymServices,
    type GymIdUpdate,
    type GymFilter,
} from "./services";

/* =======================
   Gym hooks
======================= */

// 🔹 Get single gym by id (imperative → mutation)
export const useGetOneGym = () =>
    useMutation({
        mutationKey: ["getOneGym"],
        mutationFn: (data: GymIdUpdate) =>
            gymServices.getOneGym(data),
    });

// 🔹 Get gyms with filters

export const useGetGymsWithFilter = (filters: GymFilter) =>
    useQuery({
        queryKey: ["getGymsWithFilter", filters],
        queryFn: () => gymServices.getGymsWithFilter(filters),
        // enabled: !!filters,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

// 🔹 Get gym by slug (page-level → query)
export const useGetGymBySlug = (slug?: string) =>
    useQuery({
        queryKey: ["getGymBySlug", slug],
        queryFn: () => gymServices.getGymDataBySlug(slug!),
        enabled: !!slug,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: true,
    });
