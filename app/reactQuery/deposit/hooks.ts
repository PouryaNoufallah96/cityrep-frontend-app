import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepositState, depositServices, type CreateDepositPayload, type VerifyDepositPayload } from "~/reactQuery/deposit/services";

export const useCreateDeposit = () =>
    useMutation({
        mutationKey: ["createDeposit"],
        mutationFn: (data: CreateDepositPayload) =>
            depositServices.createDeposit(data),
    });


export const useVerifyDeposit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["verifyDeposit"],
        mutationFn: (data: VerifyDepositPayload) =>
            depositServices.verifyDeposit(data),
        onSuccess: (result) => {
            if (result.state !== DepositState.Done) return;

            return Promise.all([
                queryClient.invalidateQueries({ queryKey: ["wallet"] }),
                queryClient.invalidateQueries({ queryKey: ["getClientTransactionsInfinite"] }),
            ]);
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["clientGymAttendanceList"] }),
    });
};
