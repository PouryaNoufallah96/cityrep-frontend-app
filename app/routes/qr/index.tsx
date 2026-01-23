import { Banknote, CalendarDays, ChevronLeft, Clock, QrCode, XIcon } from "lucide-react"
import { useState } from "react"
import { PaperPlane } from "react-coolicons"
import CheckoutItem from "~/components/gym/reserve/CheckoutItem"
import { dateTimes, trends } from "~/constants/mock"

const QrcodePage = () => {
    const [showQr, setShowQr] = useState(false)
    return (

        <>
            {showQr &&
                <div className="absolute top-0 left-0 w-full z-[400] h-[100svh] flex items-center justify-center flex-col bg-radial-[50%_50%_at_50%_50%,_#36314D_0%,_#202020_100%]">
                    <button className="absolute top-5 text-white left-5" onClick={()=>setShowQr(false)}>
                        <XIcon />
                    </button>
                    <div className="w-[280px] h-[280px] rounded-[28px] flex items-center justify-center border border-white p-4">
                        <div className="bg-white rounded-[20px] w-full h-full flex items-center justify-center">
                            <img src="/images/mock/qr.jpg" alt="" />
                        </div>
                    </div>
                    <p className="mt-10 text-white">هنگام ورود به باشگاه اسکن کنید.</p>
                </div >
            }

            <div className="w-full h-[100svh] overflow-auto my-scroll flex flex-col pt-4 bg-[#121314]">
                <div className="w-full bg-[#2B2B2B] rounded-[16px] flex-col gap-5 flex items-center justify-center p-4">
                    <img src="/images/mock/gymMock.jpg" alt="" className="w-full aspect-[296/151] object-cover rounded-[8px]" />
                    <div className="w-full items-center justify-between flex">
                        <div>
                            <p className="text-white">حس خوب زندگی</p>
                            <p className="text-primary-700 text-sm mt-2">فیتنس</p>
                        </div>
                        <div>
                            <div className="w-10 text-primary-700 h-10 flex items-center justify-center bg-[#121314] rounded-full">
                                <PaperPlane />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#121314] p-4 rounded-[16px] w-full gap-4 flex flex-col">
                        <CheckoutItem
                            icon={<CalendarDays className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                            label="تاریخ"
                            value={"شنبه، 25 شهریور 1402"}
                        />
                        <CheckoutItem
                            icon={<Clock className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                            label="ساعت"
                            value={"16:00 تا 17:00"}
                        />

                        <CheckoutItem
                            icon={<Banknote className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                            label="مبلغ"
                            value={
                                "150,000 تومان"
                            }
                        />
                    </div>
                    <button onClick={() => setShowQr(true)} className="text-[#B1FF68] bg-[#121314] w-full rounded-[16px] flex items-center justify-between p-4">
                        <div className="flex gap-2 items-center">
                            <QrCode />
                            <p className="text-sm">مشاهده QR</p>
                        </div>
                        <ChevronLeft />
                    </button>
                </div>
            </div>
        </>
    )
}

export default QrcodePage