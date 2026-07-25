import { axiosInstance } from "~/lib/axiosInstance";
import type { GymLevel } from "~/types";

export interface CreateGymAttendanceUpdate {
    gymId: string;
    gymTrendId: string;
    gymSessionId: string;
}

export interface GetClientGymAttendanceListUpdate {
    "pagination": {
        "page": number,
        "size": number
    },
    "states"?: GymAttendanceState[],
    "levels"?: GymLevel[],
    "from"?: string,
    "to"?: string,
    "search"?: string
}

export interface ClientGymAttendanceItem {
    "createdMoment": string,
    "modifiedMoment": string,
    "gymAttendanceId": string,
    "gymAttendanceReference": string,
    "gymId": string,
    "gymTitle": string,
    "gymTrendId": string,
    "gymTrendTitle": string,
    "gymTrendIconUrl"?: string,
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
    "clientStartTime": number | null,
    "notes": string,
    "level": GymLevel,
    "expirePaymentCode": string | null,
    "gymAttendanceState": GymAttendanceState,
    "sessionDate": string,
    "givenRate": number | null
}

export interface GetClientGymAttendanceListResult {
    data: ClientGymAttendanceItem[];
    "pageCount": number,
    "totalCount": number
}

export interface AddRateUpdate {
    gymAttendanceId: string;
    givenRate: number;
}

export interface UpsertRateResult {
    data: boolean;
    isSuccess: boolean;
    statusCode: number;
    message: string;
}

export enum GymAttendanceState {
    Pending = "Pending",
    Reserved = "Reserved",
    Used = "Used",
    Expired = "Expired",
    Failed = "Failed",
    NoShow = "NoShow",
    Cancelled = "Cancelled",
}

export interface CreateymAttendanceResponse {
    "state": GymAttendanceState,
    "gatewayUrl": string | null,
    "remain": number,
    attendanceReference: string,
    depositReference?: string | null
}

export const gymAttendanceServices = {
    createByClient: async (
        data: CreateGymAttendanceUpdate
    ): Promise<CreateymAttendanceResponse> => {
        const res = await axiosInstance.post(
            "/GymAttendance/CreateByClient",
            data
        );
        return res.data.data;
    },

    getClientList: async (
        data: GetClientGymAttendanceListUpdate
    ): Promise<GetClientGymAttendanceListResult> => {
        const res = await axiosInstance.post(
            "/GymAttendance/GetClientList",
            data
        );
        return res.data.data;
    },

    upsertRate: async (
        data: AddRateUpdate
    ): Promise<UpsertRateResult> => {
        const res = await axiosInstance.post(
            "/GymAttendance/UpsertRate",
            data
        );
        return res.data;
    },
};
