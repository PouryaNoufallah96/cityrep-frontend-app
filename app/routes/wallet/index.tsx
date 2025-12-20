import { Plus, User2} from "lucide-react";
import TransactionCard from "~/components/wallet/TransactionCard";
import {Link} from "react-router";

const WalletPage = () => {
    return (
        <div className="w-full relative h-[100svh]">
            <div className="w-full relative z-[10] h-full flex flex-col items-center">
                <div className="w-full h-[203px] py-4 flex flex-col items-center relative">
                    <img src="/images/walletBg.svg" className="w-full h-[calc(100%-32px)] z-1 absolute" alt="wallet"/>
                    <div className="relative z-[2] max-w-[336px] p-4 w-full h-full flex flex-col text-white gap-6">
                        <div className="flex items-center">
                            <User2/>
                            <p>علی آهاریان</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p>موجودی کیف پول</p>
                            <p>12,000,000 تومان</p>
                        </div>
                        <Link to={"/wallet/charge"}
                            className="w-full h-12 bg-white/12 p-2 flex items-center rounded-lg cursor-pointer gap-4">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-primary-700">
                                <Plus/></div>
                            <p>شارژ کیف پول</p>
                        </Link>
                    </div>
                </div>
                <div
                    className="w-[calc(100%+32px)] h-[calc(100%-203px)] bg-[#2B2B2B] rounded-t-[24px] p-4">
                    <div className="w-full h-[calc(100%-70px)] overflow-auto my-scroll  flex flex-col gap-4">


                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۶"
                            time="12:20"
                            title="شارژ کیف پول"
                            amount="1,200,000+"
                            type="in"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />

                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۶"
                            time="12:20"
                            title="شارژ کیف پول"
                            amount="1,200,000+"
                            type="in"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />

                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۶"
                            time="12:20"
                            title="شارژ کیف پول"
                            amount="1,200,000+"
                            type="in"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />
                        <TransactionCard
                            date="۱۴۰۴/۱۰/۰۵"
                            time="10:49"
                            title="باشگاه روشا"
                            amount="500,000-"
                            type="out"
                        />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletPage