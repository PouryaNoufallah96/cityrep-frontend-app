import Navigator from "~/components/shared/Navigator";
import {useState} from "react";
import {useNavigate} from "react-router";


const ChargeWalletPage = () => {
    const [status, setStatus] = useState<"success" | "failed" | "pending">("success")
    const navigate = useNavigate();
    return (
        <div className="w-full h-[100svh] bg-[#121314] p-4">
            <Navigator title={"شارژ کیف پول"} className="mb-20" handleBack={()=>navigate("/wallet")}/>
            {status !== "pending" && <div className="w-full">
                <div className="w-full flex flex-col items-center">
                    <img src={status === "success" ? "/images/successPay.svg" : "/images/failedPay.svg"} alt=""/>
                    <p className={`mt-2 ${status==="success"?"text-green-500":"text-red-500"}`}>{status==="success"?"پرداخت موفق":"پرداخت ناموفق"}</p>
                </div>
                <p className="text-white text-center my-6">{status==="success"?"شارژ کیف پول شما با موفقیت انجام شد.":"شارژ کیف پول شما با انجام نشد."}</p>
                <div className="bg-[#323232] w-full flex flex-col rounded-xl p-4 gap-4">
                    <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">زمان تراکنش</p>
                        <p>۱۴۰۲/۱۰/16 | ۱۳:۴۵</p>
                    </div>

                    {status==="success" && <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">مبلغ شارژ کیف پول</p>
                        <p>12,000,000 تومان</p>
                    </div>}

                    <div className="w-full flex items-center justify-between text-white">
                        <p className="text-[#C6C6C6]">شماره پیگیری</p>
                        <p>154512156</p>
                    </div>
                </div>

            </div>}
        </div>
    )
}

export default ChargeWalletPage