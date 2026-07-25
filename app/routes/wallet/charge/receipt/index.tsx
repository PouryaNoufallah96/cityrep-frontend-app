import Navigator from "~/components/shared/Navigator";
import { useLocation, useNavigate } from "react-router";
import { DepositState, type VerifyDepositResult } from "~/reactQuery/deposit/services";

type ReceiptState = {
    result?: VerifyDepositResult;
    failed?: boolean;
    depositReference?: string;
    amount?: number;
};

const ChargeWalletPage = () => {
    const location = useLocation();
    const receipt = location.state as ReceiptState | null;
    const result = receipt?.result;
    const amount = result?.amount ?? receipt?.amount;
    const status = !receipt
        ? "pending"
        : receipt.failed
            ? "failed"
            : result?.state === DepositState.Done
                ? "success"
                : result
                    ? "failed"
                    : "pending";
    const navigate = useNavigate();
    return (
        <div className="w-full h-[100svh] bg-[#121314] p-4">
            <Navigator title={"شارژ کیف پول"} className="mb-20" handleBack={() => navigate("/wallet")} />
            {status !== "pending" && <div className="w-full">
                <div className="w-full flex flex-col items-center">
                    <img src={status === "success" ? "/images/successPay.svg" : "/images/failedPay.svg"} alt="" />
                    <p className={`mt-2 ${status === "success" ? "text-success" : "text-destructive"}`}>{status === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}</p>
                </div>
                <p className="text-white text-center my-6">{status === "success" ? "شارژ کیف پول شما با موفقیت انجام شد." : "شارژ کیف پول شما انجام نشد."}</p>
                <div className="bg-[#323232] w-full flex flex-col rounded-xl p-4 gap-4">
                    <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">زمان تراکنش</p>
                        <p>{
                            new Date().toLocaleDateString("fa-IR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })
                        }</p>
                    </div>

                    {amount !== undefined && Number.isFinite(amount) && <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">مبلغ شارژ کیف پول</p>
                        <p>{amount.toLocaleString("fa-IR")} تومان</p>
                    </div>}

                    <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">شماره پیگیری</p>
                        <p>{result?.reference ?? receipt?.depositReference ?? "----"}</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default ChargeWalletPage
