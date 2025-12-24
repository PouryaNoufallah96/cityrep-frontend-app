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
    dayOfWeek:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday";
    isClosed: boolean;
}

export interface GymContact {
    phoneNumber: string;
    email: string;
    socialMedia: Record<string, string>;
}

export interface GymImage {
    imageUrl: string;
    order: number;
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
