import { axiosInstance } from "~/lib/axiosInstance";
import type {
    Gender,
    GymAddress,
    GymClosure,
    GymContact,
    GymImage,
    GymLevel,
    GymWeekPrice,
    GymWorkingHour,
    NearestFilter,
    Pagination
} from "~/types";

/* =======================
   DTOs
======================= */

// 🔹 Get one gym
export interface GymIdUpdate {
    gymId: string;
}



// 🔹 Gym filter
export interface GymFilter {
    pagination?: Pagination;
    genders?: Gender[];
    gymLevels?: GymLevel[];
    gymTrendIds?: string[];
    facilityIds?: string[];
    search?: string;
    nearest?: NearestFilter;
}

export type GymState = "NotVerified" | "Verified" | "Rejected";
export type DayOfWeek =
    | "Saturday"
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday";

export type TimeType = "Session" | "FreeTime";


/* ---------------- Trends ---------------- */

export interface GymDaySchedule {
    dayOfWeek: DayOfWeek;
    sessions?: GymSession[];
}

export interface GymTrend {
    gymTrendId: string;
    title: string;
    men: GymDaySchedule[];
    women: GymDaySchedule[];
    trendIconUrl?: string;
}



/* ---------------- Facilities ---------------- */

export interface GymFacility {
    facilityId: string;
    title: string;
}

/* ---------------- Main Result ---------------- */
export interface GymSession {
    gymSessionId: string;
    price: number;
    timeType: TimeType;
    from: number; // minutes
    to: number;   // minutes
    capacity?: number; // optional (not always present)
}




export interface GymResult {
    gymId: string;
    title: string;
    slug: string;
    description: string;

    level: GymLevel;
    supportedGender: Gender[];

    address: GymAddress;
    gymTotalWorkingHour: GymWorkingHour[];
    contact: GymContact;

    images: GymImage[];
    facilities: GymFacility[];
    trends: GymTrend[];

    weekPrices: GymWeekPrice[];

    state: GymState;
    rate: number;
    createdMoment: string; // ISO
    upcomingClosures: GymClosure[];

}



export interface GymListData {
    data: GymResult[];
    pageCount: number;
    totalCount: number;
}

export interface GymListResult {
    data: GymListData;
    isSuccess: boolean;
    statusCode: number;
    message: string;
}

/* =======================
   Services
======================= */

export const gymServices = {
    // 🔹 Get one gym by id
    getOneGym: async (data: GymIdUpdate): Promise<GymResult> => {
        const res = await axiosInstance.post(
            "/Gym/GetOneGym",
            data
        );
        return res.data.data;
    },

    // 🔹 Get gyms with filters
    getGymsWithFilter: async (
        data: GymFilter
    ): Promise<GymListResult> => {
        const res = await axiosInstance.post(
            "/Gym/GetGymsWithFilter",
            data
        );
        return res.data;
    },

    // 🔹 Get gym full data by slug
    getGymDataBySlug: async (slug: string): Promise<GymResult> => {
        const res = await axiosInstance.post(
            "/Gym/GetGymDataBySlug",
            null,
            {
                params: { slug },
            }
        );
        return res.data.data;
    },
};
