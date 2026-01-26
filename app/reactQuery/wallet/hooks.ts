import { walletServices, type GetClientTransactionsResponse } from "~/reactQuery/wallet/services";
import { useInfiniteQuery } from "@tanstack/react-query";

/* =======================
   deposit hooks
======================= */



export const useGetClientTransactionsInfinite = (size = 20) =>
  useInfiniteQuery<GetClientTransactionsResponse, Error>({
    queryKey: ["getClientTransactionsInfinite", size],

    initialPageParam: 1, // ⭐️ اجباری در v5

    queryFn: ({ pageParam }) =>
      walletServices.getClientTransactions({
        page: pageParam as number,
        size,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.pageCount
        ? nextPage
        : undefined;
    },
  });