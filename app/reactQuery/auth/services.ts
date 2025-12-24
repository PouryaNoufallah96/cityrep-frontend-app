import {axiosInstance} from "~/lib/axiosInstance";

/* =======================
   Auth – DTOs
======================= */

export interface GetVerificationCodeForAuthenticationRequest {
    phoneNumber: string;
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

/* =======================
   Profile – DTOs
======================= */

export interface ClientResult {
    id: string;
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface ClientProfileDataUpdate {
    "fullName": string,
    "birthDay": string,
    "gender": "Male" | "Female",
    "provice"?: string,
    "city"?: "string",
    "address"?: "string"
}

export interface ChangePhoneNumberRequest {
    newPhoneNumber: string;
}

export interface VerifyChangePhoneNumberRequest {
    newPhoneNumber: string;
    verificationCode: string;
}

/* =======================
   Services
======================= */
const clientId: string = import.meta.env.VITE_CLIENT_ID || "";
const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET || "";

export const clientAuthServices = {
    // 🔹 Request verification code
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
        return res.data;
    },

    // 🔹 Verify code & login
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

    // 🔹 Renew access token
    renewToken: async (): Promise<RenewTokenResult> => {
        const res = await axiosInstance.get("/Client/RenewToken");
        return res.data;
    },

    // 🔹 Get authenticated client profile
    getClientData: async (): Promise<ClientResult> => {
        const res = await axiosInstance.get("/Client/GetClientData");
        return res.data;
    },

    // 🔹 Create / update profile
    upsertProfileData: async (
        data: ClientProfileDataUpdate
    ): Promise<ClientResult> => {
        const res = await axiosInstance.put(
            "/Client/UpsertProfileData",
            data
        );
        return res.data;
    },

    // 🔹 Request phone number change
    requestChangePhoneNumber: async (
        data: ChangePhoneNumberRequest
    ): Promise<boolean> => {
        const res = await axiosInstance.put(
            "/Client/RequestChangePhoneNumber",
            data
        );
        return res.data;
    },

    // 🔹 Verify phone number change
    verifyChangePhoneNumber: async (
        data: VerifyChangePhoneNumberRequest
    ): Promise<boolean> => {
        const res = await axiosInstance.put(
            "/Client/VerifyChangePhoneNumber",
            data
        );
        return res.data;
    },
};
