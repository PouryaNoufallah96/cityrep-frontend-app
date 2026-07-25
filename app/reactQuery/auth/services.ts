import { axiosInstance } from "~/lib/axiosInstance";
import type { Gender, GymAddress } from "~/types";

export interface GetVerificationCodeForAuthenticationRequest {
    phoneNumber: string;
}

export interface WalletResult {
    walletId: string;

    totalBalance: number;
    availableBalance: number;
    frozenBalance: number;
}


export type GetVerificationCodeForAuthenticationResult = boolean;

export interface VerifyAndLoginWithVerificationCodeRequest {
    phoneNumber: string;
    verificationCode: string;
}

export interface RenewTokenResult {
    access_token: string;
    token_type: string;
    expires_in: number;
    hasProfile: boolean;
}

export type ClientStatus = "Active" | "Ban" | "NotVerified";
export type ClientRole = "Client" | "GymOwner" | "Admin";

export interface ClientResult {
    phoneNumber: string;

    lastName: string;
    firstName: string;
    gender?: Gender;
    isProfileCompleted: boolean;

    status: ClientStatus;
    role: ClientRole;

    loginDates: string[]; // ISO[]
    birthDay?: string;    // YYYY-MM-DD

    address: GymAddress;

    createdMoment: string;  // ISO
    modifiedMoment: string; // ISO
}

export interface ClientProfileDataUpdate {
    LastName: string;
    FirstName: string;
    "birthDay": string,
    "gender": "Male" | "Female",
    "provice"?: string,
    "city"?: "string",
    "address"?: "string"
}

export interface ChangePhoneNumberRequest {
    phoneNumber: string;
}

export interface VerifyChangePhoneNumberRequest {
    verificationCode: string;
}

const clientId: string = import.meta.env.VITE_CLIENT_ID || "";
const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET || "";

export const clientAuthServices = {
    requestVerificationCode: async (
        data: GetVerificationCodeForAuthenticationRequest
    ): Promise<GetVerificationCodeForAuthenticationResult> => {

        const res = await axiosInstance.post(
            "/Client/GetVerificationCodeForAuthentication",
            {
                ...data,
                clientId,
                clientSecret
            }
        );
        return res.data.data;
    },

    verifyAndLogin: async (
        data: VerifyAndLoginWithVerificationCodeRequest
    ): Promise<RenewTokenResult> => {
        const res = await axiosInstance.post(
            "/Client/VerifyAndLoginWithVerificationCode",
            {
                ...data, clientId,
                clientSecret
            }
        );
        return res.data;
    },

    renewToken: async (): Promise<RenewTokenResult> => {
        const res = await axiosInstance.get("/Client/RenewToken");
        return res.data;
    },

    getClientData: async (): Promise<ClientResult> => {
        const res = await axiosInstance.get("/Client/GetClientData");
        return res.data.data;
    },

    upsertProfileData: async (
        data: ClientProfileDataUpdate
    ): Promise<ClientResult> => {
        const res = await axiosInstance.put(
            "/Client/UpsertProfileData",
            data
        );
        return res.data.data;
    },

    requestChangePhoneNumber: async (
        data: ChangePhoneNumberRequest
    ): Promise<boolean> => {
        const res = await axiosInstance.put(
            "/Client/RequestChangePhoneNumber",
            data
        );
        return res.data.data;
    },

    verifyChangePhoneNumber: async (
        data: VerifyChangePhoneNumberRequest
    ): Promise<boolean> => {
        const res = await axiosInstance.put(
            "/Client/VerifyChangePhoneNumber",
            data
        );
        return res.data.data;
    },

    getOrCreateWallet: async (): Promise<WalletResult> => {
        const res = await axiosInstance.get(
            "/Wallet/GetOrCreateWallet"
        );
        return res.data.data;
    },

};
