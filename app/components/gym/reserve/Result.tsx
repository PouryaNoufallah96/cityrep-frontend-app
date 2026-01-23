import { Check, XIcon } from "lucide-react";


const Result = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <div className="flex flex-col">
            <div className="mb-[52px] bg-[#B1FF6814] flex relative items-center justify-center w-full h-[122px] relative">
                <button className="w-6 h-6 absolute top-5 left-5 text-white" onClick={handleClose}>
                    <XIcon />
                </button>
                <div className="absolute -bottom-[36px] w-[72px] h-[72px] bg-[#2B2B2B] rounded-full p-2 flex items-center justify-center">
                    <div className="bg-[#B1FF68] w-full h-full flex items-center justify-center rounded-full">
                        <Check className="text-[#2B2B2B] w-9 h-9" />
                    </div>
                </div>
            </div>
            <p className="text-[#B1FF68] text-[20px] text-center mb-[78px]">
                رزرو موفق
            </p>
            <div className="w-full flex items-center justify-center flex-col gap-10">
                <div className="w-[208px] h-[208px] rounded-[24px] border border-primary-main flex items-center justify-center">
                    <div className="w-[160px] h-[160px] bg-white flex items-center justify-center p-3 rounded-[16px]">
                        <img src="/images/mock/qr.jpg" alt="" />
                    </div>
                </div>
                <p className="text-white">
                    هنگام ورود به باشگاه اسکن کنید.
                </p>
            </div>

        </div>
    );
}

export default Result;