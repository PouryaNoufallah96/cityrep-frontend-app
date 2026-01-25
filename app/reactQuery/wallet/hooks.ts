import { useMutation, useQuery } from "@tanstack/react-query";
import { depositServices, type CreateDepositPayload, type VerifyDepositPayload } from "~/reactQuery/deposit/services";
import { walletServices, type GetClientTransactionsPayload } from "~/reactQuery/wallet/services";

/* =======================
   deposit hooks
======================= */


export const useGetClientTransactions = (data: GetClientTransactionsPayload) =>
    useQuery({
        queryKey: ["getClientTransactions"],
        queryFn: () =>
            walletServices.getClientTransactions(data),
    });

