import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {useEffect} from "react";
import L from "@neshan-maps-platform/leaflet";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const toCapitalized = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export function setSessionStorage(key: string, value: any) {
    const encoded = btoa(JSON.stringify(value)); // base64 encode
    localStorage.setItem(key, encoded);
}

export function getSessionStorage<T = any>(key: string): T | null {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    try {
        return JSON.parse(atob(stored)) as T;
    } catch {
        return null;
    }
}

export const toUintScaled = (num: number | string, scale: bigint) => {
    // accepts "3.6942..." or number, returns BigInt(num * scale)
    const s = typeof num === "number" ? num.toString() : num;
    // avoid FP: split integer/decimal
    const [intPart, decPartRaw = ""] = s.replace(/[^0-9.]/g, "").split(".");
    const decPart = decPartRaw.slice(0, String(scale).length - 1); // trim to scale digits
    const padded = decPart.padEnd(String(scale).length - 1, "0");
    return BigInt(intPart || "0") * scale + BigInt(padded || "0");
};

export const toUnixSeconds = (iso: string) =>
    BigInt(Math.floor(new Date(iso).getTime() / 1000));

export function addCommas(value: number | string): string {
    if (value === null || value === undefined) return "";
    const num = typeof value === "number" ? value : parseFloat(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString("en-US");
}

export const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) =>
            setTimeout(() => reject({ response: { data: { Message: "timeout" } } }), ms)
        ),
    ]);
};
export function diffTime(end: string) {
    const endUTC = new Date(end + "Z").getTime();
    const nowUTC = Date.now();
    const diffMs = endUTC - nowUTC;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return { days, hours, minutes };
}

export function bestTimeUnit(diff: { days: number; hours: number; minutes: number }) {
    if (diff.days > 0) return { value: diff.days, label: "Days" };
    if (diff.hours > 0) return { value: diff.hours, label: "Hours" };
    return { value: diff.minutes, label: "Minutes" };
}




const randomInRange = (min: number, max: number) =>
    Number((Math.random() * (max - min) + min).toFixed(6));

export const randomTehranLocation = () => ({
    lat: randomInRange(35.60, 35.80),
    lng: randomInRange(51.30, 51.55),
});

export const getGoogleMapsDirectionUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;



export const boundsToNearestFilter = (map: L.Map) => {
    const bounds = map.getBounds();
    const center = bounds.getCenter();

    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    // approximate radius in meters
    const radius = center.distanceTo(northEast);

    return {
        latitude: center.lat,
        longitude: center.lng,
        maxDistanceMeters: Math.round(radius),
    };
};
