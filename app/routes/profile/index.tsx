import { LogOutIcon, User2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { setSessionStorage } from "~/lib/utils";
import { useGetClientData } from "~/reactQuery/auth/hooks";
import moment from "moment-jalaali";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "~/components/ui/sheet";

const ProfilePage = () => {

    const { data: userData } = useGetClientData();
    const [logoutSheetOpen, setLogoutSheetOpen] = useState(false);

    const handleLogout = () => {
        setSessionStorage(import.meta.env.VITE_TOKEN_KEY, undefined);
        window.location.reload();
    };

    return (
        <div className="w-full relative h-[100svh]">
            <img className="z-[5] opacity-30 object-cover absolute top-0 left-0 w-full h-full" src="/images/splash.jpg"
                alt="CityRep" />
            <div className="w-full relative z-[10] h-full flex flex-col items-center">
                <div className="w-full h-[184px] pt-10 pb-4 flex flex-col items-center">
                    <div
                        className="w-16 h-16 rounded-full bg-[#2B2B31] flex items-center justify-center text-primary-700">
                        <User2 className='size-8' />
                    </div>
                    <p className="text-white mt-2">{userData?.firstName} {userData?.lastName}</p>
                    <p className="text-white mt-2">{userData?.phoneNumber}</p>
                </div>
                <div className="w-[calc(100%+32px)] h-[calc(100%-184px)] bg-[#2B2B2B] rounded-t-[24px] p-4">
                    <div className="bg-[#121314] w-full h-14 rounded-[12px] px-4 flex items-center justify-between">
                        <p className="text-primary-700">تاریخ تولد</p>
                        <p className="text-white">{userData?.birthDay ? moment(userData.birthDay, "YYYY-MM-DD").format("jYYYY/jMM/jDD") : ""}</p>
                    </div>

                    <Button onClick={() => setLogoutSheetOpen(true)}
                        className="w-full h-14 mt-4 rounded-full bg-white/8 hover:bg-white/10 flex items-center justify-start">
                        <div
                            className="flex items-center justify-center rounded-full w-10 h-10 bg-secondary-main/12 text-secondary-main">
                            <LogOutIcon />
                        </div>
                        <p className="text-white">خروج</p>
                    </Button>

                </div>
            </div>

            <Sheet open={logoutSheetOpen} onOpenChange={setLogoutSheetOpen}>
                <SheetContent side="bottom" className="pb-6 z-[100] max-w-xl min-h-[max-content] mx-auto bg-[#1a1a1a] border-t border-white/10 rounded-t-[24px]">
                    <SheetHeader className="pb-4 border-b border-white/10">
                        <SheetTitle className="text-white text-right">خروج از حساب کاربری</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 flex flex-col gap-6 px-4">
                        <p className="text-white text-right text-sm">آیا از خروج خود اطمینان دارید؟</p>
                    </div>
                    <SheetFooter className="flex-row gap-3 pt-4 grid grid-cols-2 px-4">
                        <SheetClose asChild>
                            <Button
                                variant="outline"
                                className="w-full rounded-full border-white/20 text-white bg-transparent"
                            >
                                انصراف
                            </Button>
                        </SheetClose>
                        <Button
                            onClick={handleLogout}
                            className="w-full rounded-full bg-primary-main text-white hover:bg-secondary-main/90 font-bold"
                        >
                            خروج
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ProfilePage