import {axiosInstance} from "~/lib/axiosInstance";

export interface NonceRequest {
    walletAddress: string;
    clientId: string;
    clientSecret: string;
}

export interface NonceResult {
    "data": {
        "nonce": string,
        "message": string,
        "shouldVerify": boolean,
        "expireMoment": string,
    },
    "isSuccess": boolean,
    "statusCode": number,
    "message": "success" | "error"

}

export interface NonceVerification {
    walletAddress: string;
    signature: string;
    clientId: string;
    clientSecret: string;
    nonce: string;
}

export interface NonceVerificationPureWallet {
    walletAddress: string;
    clientId: string;
    clientSecret: string;
}

export interface GetUserResult {
    "createMoment": string
    "walletAddress": string,
    "loginHistories": string[]
}

export interface NonceVerifyResult {
    "access_token": string,
    "token_type": string,
    "expires_in": number
}

export interface GetUserStatsResult {
    "userStatus": string
}

export const authServices = {
    getNonce: async (data: NonceRequest): Promise<NonceResult> => {
        const res = await axiosInstance.post(`/User/GetNonce`, data);
        return res.data;
    },

    getToken: async (data: NonceVerification): Promise<NonceVerifyResult> => {
        const res = await axiosInstance.post(`/User/GetToken`, data);
        return res.data;
    },

    getTokenWithPureWallet: async (data: NonceVerificationPureWallet): Promise<NonceVerifyResult> => {
        const res = await axiosInstance.post(`/User/GetTokenWithPureWalletAddress`, data);
        return res.data;
    },

    getUser: async (): Promise<GetUserResult> => {
        const res = await axiosInstance.post(`/User/GetUser`);
        return res.data.data;
    },
    getUserStats: async (): Promise<GetUserStatsResult> => {
        const res = await axiosInstance.get(`/User/GetUserStats`);
        return res.data.data;
    },

    logout: async (): Promise<void> => {
        const res = await axiosInstance.post(`/User/logout`);
        return res.data;
    },
};
