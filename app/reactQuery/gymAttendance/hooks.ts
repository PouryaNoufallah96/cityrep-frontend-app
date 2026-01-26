import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
    gymAttendanceServices,
    type CreateGymAttendanceUpdate,
    type GetClientGymAttendanceListUpdate,
    type AddRateUpdate,
    type GetClientGymAttendanceListResult,
} from "./services";

/* =======================
   Gym Attendance hooks
======================= */

// 🔹 Create attendance (check-in)
export const useCreateGymAttendance = () =>
    useMutation({
        mutationKey: ["createGymAttendance"],
        mutationFn: (data: CreateGymAttendanceUpdate) =>
            gymAttendanceServices.createByClient(data),
    });

// 🔹 Get client attendance list

export const useGetClientGymAttendanceListInfinite = (
    params: Omit<GetClientGymAttendanceListUpdate, "pagination">,
    pageSize = 20
) =>
    useInfiniteQuery<GetClientGymAttendanceListResult, Error>({
        queryKey: ["clientGymAttendanceList", params],

        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            gymAttendanceServices.getClientList({
                ...params,
                pagination: {
                    page: pageParam as number,
                    size: pageSize
                }
            }),

        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= lastPage.pageCount ? nextPage : undefined;
        }
    });

// 🔹 Add / update rate
export const useUpsertGymAttendanceRate = () =>
    useMutation({
        mutationKey: ["upsertGymAttendanceRate"],
        mutationFn: (data: AddRateUpdate) =>
            gymAttendanceServices.upsertRate(data),
    });
