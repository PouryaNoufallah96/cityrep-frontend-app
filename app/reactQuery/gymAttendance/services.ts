import { axiosInstance } from "~/lib/axiosInstance";

/* =======================
   DTOs
======================= */

// 🔹 Create attendance
export interface CreateGymAttendanceUpdate {
    gymId: string;
    planId?: string;
    checkInMoment?: string; // ISO string (if backend allows override)
}

// 🔹 Attendance list request
export interface GetClientGymAttendanceListUpdate {
    page?: number;
    pageSize?: number;
    fromDate?: string; // ISO
    toDate?: string;   // ISO
}

// 🔹 Attendance list result
export interface ClientGymAttendanceItem {
    id: string;
    gymId: string;
    gymName: string;
    checkInMoment: string;
    rate?: number;
}

export interface GetClientGymAttendanceListResult {
    items: ClientGymAttendanceItem[];
    totalCount: number;
}

// 🔹 Add / update rate
export interface AddRateUpdate {
    attendanceId: string;
    rate: number; // usually 1–5
}

/* =======================
   Services
======================= */

export const gymAttendanceServices = {
    // 🔹 Create attendance
    createByClient: async (
        data: CreateGymAttendanceUpdate
    ): Promise<string> => {
        const res = await axiosInstance.post(
            "/GymAttendance/CreateByClient",
            data
        );
        return res.data;
    },

    // 🔹 Get client attendance list
    getClientList: async (
        data: GetClientGymAttendanceListUpdate
    ): Promise<GetClientGymAttendanceListResult> => {
        const res = await axiosInstance.post(
            "/GymAttendance/GetClientList",
            data
        );
        return res.data;
    },

    // 🔹 Add or update rate
    upsertRate: async (
        data: AddRateUpdate
    ): Promise<boolean> => {
        const res = await axiosInstance.post(
            "/GymAttendance/UpsertRate",
            data
        );
        return res.data;
    },
};
