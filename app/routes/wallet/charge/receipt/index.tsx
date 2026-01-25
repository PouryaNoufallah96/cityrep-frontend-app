import Navigator from "~/components/shared/Navigator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const ChargeWalletPage = () => {
    //get status and amount from query params or state
    const query = new URLSearchParams(window.location.search);
    const [status, setStatus] = useState<"success" | "failed" | "pending">(query.get("status") as "success" | "failed" | "pending" || "pending");
    useEffect(() => {
        setStatus(query.get("status") as "success" | "failed" | "pending" || "pending")
    }
        , [query]);

    const navigate = useNavigate();
    return (
        <div className="w-full h-[100svh] bg-[#121314] p-4">
            <Navigator title={"شارژ کیف پول"} className="mb-20" handleBack={() => navigate("/wallet")} />
            {status !== "pending" && <div className="w-full">
                <div className="w-full flex flex-col items-center">
                    <img src={status === "success" ? "/images/successPay.svg" : "/images/failedPay.svg"} alt="" />
                    <p className={`mt-2 ${status === "success" ? "text-green-500" : "text-red-500"}`}>{status === "success" ? "پرداخت موفق" : "پرداخت ناموفق"}</p>
                </div>
                <p className="text-white text-center my-6">{status === "success" ? "شارژ کیف پول شما با موفقیت انجام شد." : "شارژ کیف پول شما با انجام نشد."}</p>
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

                    {status === "success" && <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">مبلغ شارژ کیف پول</p>
                        <p>{parseInt(query.get("amount") || "0").toLocaleString("fa-IR")} تومان</p>
                    </div>}

                    <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">شماره پیگیری</p>
                        <p>----</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default ChargeWalletPage