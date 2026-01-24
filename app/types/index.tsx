import type { DayOfWeek } from "~/reactQuery/gym/services";

export interface GeoLocation {
    longitude: number;
    latitude: number;
}

export interface GymAddress {
    geoLocation: GeoLocation;
    province: string;
    city: string;
    address: string;
    postalCode: string;
}

export interface GymWorkingHour {
  dayOfWeek: DayOfWeek;
  from?: number;
  to?: number;
  isClosed: boolean;
}
export interface GymClosure {
  gymClosureId: string;
  gymId: string;
  closureDate: string; // ISO
  dayOfWeek: DayOfWeek;
  isAllDay: boolean;
  from: number; // minutes
  to: number;   // minutes
  reason?: string;
  createdMoment: string;
}



export interface GymContact {
    phoneNumber: string;
    email: string;
    socialMedia: Record<string, string>;
}
export interface GymSocialMedia {
  instagram?: string;
  telegram?: string;
  website?: string;
}

export interface GymImage {
    imageUrl: string;
    order: number;
}
export interface GymFacility {
  facilityId: string;
  title: string;
}
export interface GymWeekPrice {
  dayOfWeek: DayOfWeek;
  minPrice: number;
  maxPrice: number;
}


export interface Pagination {
    page: number;
    size: number;
}

export interface NearestFilter {
    latitude: number;
    longitude: number;
    maxDistanceMeters: number;
}

export type Gender = "Male" | "Female";
export type GymLevel = "Basic" | "Intermediate" | "Advanced" | "Professional"

export type GymDateTime = {
    id: number,
    label: string,
    dateText: string,
    times: GymTime[]
}

export type GymTime = {
    start: string,
    end: string,
    id: number
}

export type TrendButtonItem = {
  id: string;
  trendId: string;
  gender: "Male" | "Female";
  title: string;
  price: number;
  icon?: string;
};