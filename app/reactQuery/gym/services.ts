import { axiosInstance } from "~/lib/axiosInstance";
import type {
    Gender,
    GymAddress,
    GymContact,
    GymImage,
    GymLevel,
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


/* ---------------- Trends ---------------- */

export interface GymTrendWorkingHours {
    isActive: boolean;
    workingHours: GymWorkingHour[];
}

export interface GymTrend {
    gymTrendId: string;
    title: string;
    men: GymTrendWorkingHours;
    women: GymTrendWorkingHours;
    iconImageUrl?: string;
}



/* ---------------- Facilities ---------------- */

export interface GymFacility {
    facilityId: string;
    title: string;
}

/* ---------------- Main Result ---------------- */

export interface GymResult {
    gymId: string;
    title: string;
    slug: string;
    description: string;

    level: GymLevel;
    supportedGender: ("Male" | "Female")[];

    address: GymAddress;
    gymTotalWorkingHour: GymWorkingHour[];
    contact: GymContact;

    images: GymImage[];
    facilities: GymFacility[];
    trends: GymTrend[];

    state: GymState;
    rate: number;
    createdMoment: string; // ISO
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


export interface GymFullResult {
    id: string;
    name: string;
    slug: string;
    description?: string;
    address: string;
    images: string[];
    facilities: string[];
    plans: {
        id: string;
        title: string;
        price: number;
    }[];
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
    getGymDataBySlug: async (slug: string): Promise<GymFullResult> => {
        const res = await axiosInstance.post(
            "/Gym/GetGymDataBySlug",
            null,
            {
                params: { slug },
            }
        );
        return res.data;
    },
};
