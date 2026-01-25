import { axiosInstance } from "~/lib/axiosInstance";


/* =======================
   DTOs
======================= */
export type GetClientTransactionsPayload = {
    page: number;
    size: number;
}

export type GetClientTransactionsResponse = {
    "data": ClientTransaction[],
    "pageCount": number,
    "totalCount": number
}

export type ClientTransaction = {
    "createdMoment": string,
    "title": string,
    "price": number,
    "type": string
}



/* =======================
   Services
======================= */

export const walletServices = {

    getClientTransactions: async (data: GetClientTransactionsPayload): Promise<GetClientTransactionsResponse> => {
        const res = await axiosInstance.post(
            "/Wallet/GetClientTransactions",
            data
        );
        return res.data.data;
    },


};
