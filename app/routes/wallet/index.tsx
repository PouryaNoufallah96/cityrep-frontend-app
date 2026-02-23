import { Plus, User2, Receipt } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import TransactionCard from "~/components/wallet/TransactionCard";
import {
    useGetClientData,
    useGetOrCreateWallet
} from "~/reactQuery/auth/hooks";
import { useGetClientTransactionsInfinite } from "~/reactQuery/wallet/hooks";

const WalletPage = () => {
    const { data: userData } = useGetClientData();
    const { data: walletData } = useGetOrCreateWallet();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useGetClientTransactionsInfinite(5);

    const transactions =
        data?.pages.flatMap(p => p.data) ?? [];

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        refetch();
    }
        , [refetch]);
    // ✅ infinite scroll
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const onScroll = () => {
            if (
                !hasNextPage ||
                isFetchingNextPage
            ) {
                return;
            }

            const reachedBottom =
                el.scrollTop + el.clientHeight >=
                el.scrollHeight - 80;

            if (reachedBottom) {
                fetchNextPage();
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


    return (
        <div className="w-full relative h-[100svh]">
            <div className="w-full relative z-[10] h-full flex flex-col items-center">

                {/* HEADER */}
                <div className="w-full h-[203px] py-4 flex flex-col items-center relative">
                    <img
                        src="/images/walletBg.svg"
                        className="w-full h-[calc(100%-32px)] absolute"
                        alt="wallet"
                    />

                    <div className="relative z-[2] max-w-[336px] p-4 w-full h-full flex flex-col text-white gap-6">
                        <div className="flex items-center gap-2">
                            <User2 />
                            <p>{userData?.firstName} {userData?.lastName}</p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <p>موجودی کیف پول</p>
                            <p>
                                {walletData?.totalBalance.toLocaleString("fa-IR")} تومان
                            </p>
                        </div>

                        <Link
                            to="/wallet/charge"
                            className="w-full h-12 bg-white/12 p-2 flex items-center rounded-lg gap-4"
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-primary-700">
                                <Plus />
                            </div>
                            <p>شارژ کیف پول</p>
                        </Link>
                    </div>
                </div>

                {/* TRANSACTIONS */}
                <div className="w-[calc(100%+32px)] h-[calc(100%-203px)] bg-[#2B2B2B] rounded-t-[24px] p-4">
                    <div
                        ref={listRef}
                        className="w-full h-full overflow-auto my-scroll flex flex-col gap-4"
                    >
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="w-full h-[72px] bg-[#121314] rounded-[16px] p-3 flex justify-between animate-pulse">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 rounded-full bg-white/5" />
                                        <div className="flex flex-col gap-2 pt-1">
                                            <div className="w-24 h-4 bg-white/5 rounded" />
                                            <div className="w-16 h-3 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-1 items-end">
                                        <div className="w-20 h-4 bg-white/5 rounded" />
                                        <div className="w-12 h-3 bg-white/5 rounded" />
                                    </div>
                                </div>
                            ))
                        ) : transactions.length === 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 pt-10">
                                <div className="w-24 h-24 bg-[#121314] rounded-full flex items-center justify-center mb-6">
                                    <Receipt className="text-secondary-main w-10 h-10 opacity-70" />
                                </div>
                                <p className="text-white font-bold text-lg mb-2">تراکنشی یافت نشد!</p>
                                <p className="text-white/50 text-sm max-w-[250px]">
                                    شما هنوز تراکنشی در کیف پول خود انجام نداده‌اید.
                                </p>
                            </div>
                        ) : (
                            <>
                                {transactions.map((transaction, index) => (
                                    <TransactionCard
                                        key={index}
                                        date={new Date(transaction.createdMoment).toLocaleDateString("fa-IR")}
                                        time={new Date(transaction.createdMoment).toLocaleTimeString("fa-IR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                        title={transaction.title}
                                        amount={transaction.price.toLocaleString("fa-IR")}
                                        type={transaction.type === "deposit" ? "in" : "out"}
                                    />
                                ))}

                                {/* loader */}
                                {isFetchingNextPage && (
                                    <p className="text-center text-xs text-gray-400 py-2">
                                        در حال بارگذاری...
                                    </p>
                                )}

                                {!hasNextPage && transactions.length > 0 && (
                                    <p className="text-center text-xs text-gray-500 py-2">
                                        تراکنش بیشتری وجود ندارد
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
