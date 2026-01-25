import { useMutation } from "@tanstack/react-query";
import { depositServices, type CreateDepositPayload, type VerifyDepositPayload } from "~/reactQuery/deposit/services";

/* =======================
   deposit hooks
======================= */


export const useCreateDeposit = () =>
    useMutation({
        mutationKey: ["createDeposit"],
        mutationFn: (data: CreateDepositPayload) =>
            depositServices.createDeposit(data),
    });


export const useVerifyDeposit = () =>
    useMutation({
        mutationKey: ["verifyDeposit"],
        mutationFn: (data: VerifyDepositPayload) =>
            depositServices.verifyDeposit(data),
    });