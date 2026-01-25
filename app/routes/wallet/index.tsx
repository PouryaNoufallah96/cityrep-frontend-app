import { Plus, User2 } from "lucide-react";
import { Link } from "react-router";
import TransactionCard from "~/components/wallet/TransactionCard";
import { useGetClientData, useGetOrCreateWallet } from "~/reactQuery/auth/hooks";
import { useGetClientTransactions } from "~/reactQuery/wallet/hooks";

const WalletPage = () => {
    const { data: userData } = useGetClientData()
    const { data: walletData } = useGetOrCreateWallet()
    const { data } = useGetClientTransactions({
        page: 1,
        size: 100
    })
    console.log(data)
    return (
        <div className="w-full relative h-[100svh]">
            <div className="w-full relative z-[10] h-full flex flex-col items-center">
                <div className="w-full h-[203px] py-4 flex flex-col items-center relative">
                    <img src="/images/walletBg.svg" className="w-full h-[calc(100%-32px)] z-1 absolute" alt="wallet" />
                    <div className="relative z-[2] max-w-[336px] p-4 w-full h-full flex flex-col text-white gap-6">
                        <div className="flex items-center">
                            <User2 />
                            <p>{userData?.fullName}</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p>موجودی کیف پول</p>
                            <p>{walletData?.totalBalance.toLocaleString("fa-IR")} تومان</p>
                        </div>
                        <Link to={"/wallet/charge"}
                            className="w-full h-12 bg-white/12 p-2 flex items-center rounded-lg cursor-pointer gap-4">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-primary-700">
                                <Plus /></div>
                            <p>شارژ کیف پول</p>
                        </Link>
                    </div>
                </div>
                <div
                    className="w-[calc(100%+32px)] h-[calc(100%-203px)] bg-[#2B2B2B] rounded-t-[24px] p-4">
                    <div className="w-full h-[calc(100%-70px)] overflow-auto my-scroll  flex flex-col gap-4">
                        {
                            data?.data.map((transaction, index) => (
                                <TransactionCard
                                    key={index}
                                    date={new Date(transaction.createdMoment).toLocaleDateString("fa-IR")}
                                    time={new Date(transaction.createdMoment).toLocaleTimeString("fa-IR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    title={transaction.title}
                                    amount={transaction.price.toLocaleString("fa-IR")}
                                    type={transaction.type==="deposit"?'in':'out'}
                                />

                            ))
                        }




                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage