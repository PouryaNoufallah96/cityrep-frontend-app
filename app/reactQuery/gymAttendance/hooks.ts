import { useMutation } from "@tanstack/react-query";
import {
    gymAttendanceServices,
    type CreateGymAttendanceUpdate,
    type GetClientGymAttendanceListUpdate,
    type AddRateUpdate,
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
export const useGetClientGymAttendanceList = () =>
    useMutation({
        mutationKey: ["getClientGymAttendanceList"],
        mutationFn: (data: GetClientGymAttendanceListUpdate) =>
            gymAttendanceServices.getClientList(data),
    });

// 🔹 Add / update rate
export const useUpsertGymAttendanceRate = () =>
    useMutation({
        mutationKey: ["upsertGymAttendanceRate"],
        mutationFn: (data: AddRateUpdate) =>
            gymAttendanceServices.upsertRate(data),
    });
