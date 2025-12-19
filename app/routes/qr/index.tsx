const QrcodePage = () => {
    return (
        <div className="w-[calc(100%+32px)] h-[100svh] flex items-center justify-center flex-col bg-radial-[50%_50%_at_50%_50%,_#36314D_0%,_#202020_100%]">
            <div className="w-[280px] h-[280px] rounded-[28px] flex items-center justify-center border border-white p-4">
                <div className="bg-white rounded-[20px] w-full h-full flex items-center justify-center">
                    <img src="/images/mock/qr.jpg" alt="" />
                </div>
            </div>
            <p className="mt-10 text-white">هنگام ورود به باشگاه اسکن کنید.</p>
        </div>
    )
}

export default QrcodePage