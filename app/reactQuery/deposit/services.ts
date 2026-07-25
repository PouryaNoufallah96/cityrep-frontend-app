import { axiosInstance } from "~/lib/axiosInstance";

export type CreateDepositPayload = {
    amount: number;
}

export type CreateDepositResult = string;

export enum DepositState {
    Pending = "Pending",
    Done = "Done",
    Cancel = "Cancel",
    Failed = "Failed",
}

export type VerifyDepositPayload = {
    depositReference: string;
}

export type VerifyDepositResult = {
    "amount": number,
    "reference": string,
    "state": DepositState
}

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
