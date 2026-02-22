import { axiosInstance } from "~/lib/axiosInstance";
import type { GymState } from "~/reactQuery/gym/services";
import type { GymLevel } from "~/types";

/* =======================
   DTOs
======================= */

// 🔹 Create attendance
export interface CreateGymAttendanceUpdate {
    gymId: string;
    gymTrendId: string;
    gymSessionId: string;
}

// 🔹 Attendance list request
export interface GetClientGymAttendanceListUpdate {
    "pagination": {
        "page": number,
        "size": number
    },
    "states"?: CreateAttendanceState[],
    "levels"?: GymLevel[],
    "from"?: string,
    "to"?: string,
    "search"?: string
}

// 🔹 Attendance list result
export interface ClientGymAttendanceItem {
    "createdMoment": string,
    "modifiedMoment": string,
    "gymAttendanceId": string,
    "gymAttendanceReference": string,
    "gymId": string,
    "gymTitle": string,
    "gymTrendId": string,
    "gymTrendTitle": string,
    "gymOwnerPublicKey": string,
    "gymAddress": {
        "geoLocation": {
            "longitude": number,
            "latitude": number
        },
        "province": string,
        "city": string,
        "address": string,
        "postalCode": string
    },
    "gymImageUrl": string,
    "gymTimeType": "Session" | "FreeTime",
    "gymSessionId": string,
    "sessionPrice": number,
    "gymStart": number,
    "gymEnd": number,
    "clientStartTime": number,
    "notes": string,
    "level": GymLevel,
    "expirePaymentCode": number,
    "gymAttendanceState": CreateAttendanceState,
    "sessionDate": number,
    "givenRate": number
}

export interface GetClientGymAttendanceListResult {
    data: ClientGymAttendanceItem[];
    "pageCount": number,
    "totalCount": number
}

// 🔹 Add / update rate
export interface AddRateUpdate {
    attendanceId: string;
    rate: number; // usually 1–5
}
export type CreateAttendanceState = 'Pending' | 'Reserved' | 'Used' | 'Expired' | 'Failed';
export interface CreateymAttendanceResponse {
    "state": CreateAttendanceState,
    "gatewayUrl": string,
    "remain": number,
    attendanceReference: string
}

/* =======================
   Services
======================= */

export const gymAttendanceServices = {
    // 🔹 Create attendance
    createByClient: async (
        data: CreateGymAttendanceUpdate
    ): Promise<CreateymAttendanceResponse> => {
        const res = await axiosInstance.post(
            "/GymAttendance/CreateByClient",
            data
        );
        return res.data.data;
    },

    // 🔹 Get client attendance list
    getClientList: async (
        data: GetClientGymAttendanceListUpdate
    ): Promise<GetClientGymAttendanceListResult> => {
        const res = await axiosInstance.post(
            "/GymAttendance/GetClientList",
            data
        );
        return res.data.data;
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
