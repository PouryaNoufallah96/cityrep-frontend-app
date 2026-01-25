import { axiosInstance } from "~/lib/axiosInstance";


/* =======================
   DTOs
======================= */
export type CreateDepositPayload = {
    amount: number;
}

export type CreateDepositResult = {
    depositReference: string
}

export type VerifyDepositPayload = {
    depositReference: string;
}

export type VerifyDepositResult = {
    "amount": number,
    "reference": string,
    "state": string
}



/* =======================
   Services
======================= */

export const depositServices = {

    createDeposit: async (data: CreateDepositPayload): Promise<CreateDepositResult> => {
        const res = await axiosInstance.post(
            "/Deposit/CreateDeposit",
            data
        );
        return res.data.data;
    },
    verifyDeposit: async (data: VerifyDepositPayload): Promise<VerifyDepositResult> => {
        const res = await axiosInstance.post(
            "/Deposit/VerifyDeposit",
            data
        );
        return res.data.data;
    },


};
