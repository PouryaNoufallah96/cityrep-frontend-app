import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    gymAttendanceServices,
    type CreateGymAttendanceUpdate,
    type GetClientGymAttendanceListUpdate,
    type AddRateUpdate,
    type ClientGymAttendanceItem,
    type GetClientGymAttendanceListResult,
    GymAttendanceState,
} from "./services";

export const useCreateGymAttendance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["createGymAttendance"],
        mutationFn: (data: CreateGymAttendanceUpdate) =>
            gymAttendanceServices.createByClient(data),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["clientGymAttendanceList"] }),
    });
};

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

export const useGetClientGymAttendanceStatus = (
    attendanceReference: string,
    enabled: boolean
) =>
    useQuery<ClientGymAttendanceItem | undefined, Error>({
        queryKey: ["clientGymAttendanceStatus", attendanceReference],
        queryFn: async () => {
            const result = await gymAttendanceServices.getClientList({
                pagination: {
                    page: 1,
                    size: 1,
                },
                states: [
                    GymAttendanceState.Reserved,
                    GymAttendanceState.Used,
                ],
                search: attendanceReference,
            });

            return result.data.find(
                item => item.gymAttendanceReference === attendanceReference
            );
        },
        enabled: enabled && !!attendanceReference,
        refetchInterval: enabled ? 2000 : false,
        refetchOnWindowFocus: false,
    });

export const useUpsertGymAttendanceRate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["upsertGymAttendanceRate"],
        mutationFn: (data: AddRateUpdate) =>
            gymAttendanceServices.upsertRate(data),
        onSuccess: (result) => {
            if (!result.isSuccess) return;

            return queryClient.invalidateQueries({
                queryKey: ["clientGymAttendanceList"],
            });
        },
    });
};
