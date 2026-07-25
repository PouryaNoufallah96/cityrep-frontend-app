import { LogOutIcon, Pencil, User2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { setSessionStorage } from "~/lib/utils"
import { useGetClientData } from "~/reactQuery/auth/hooks"
import moment from "moment-jalaali"
import { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "~/components/ui/sheet"
import ChangePhoneSheet from "~/components/profile/ChangePhoneSheet"

const ProfilePage = () => {
    const { data: userData } = useGetClientData()
    const [logoutSheetOpen, setLogoutSheetOpen] = useState(false)
    const [changePhoneSheetOpen, setChangePhoneSheetOpen] = useState(false)

    const handleLogout = () => {
        setSessionStorage(import.meta.env.VITE_TOKEN_KEY, undefined)
        window.location.reload()
    }

    return (
        <div className="relative h-[100svh] w-full">
            <img
                className="absolute top-0 left-0 z-[5] h-full w-full object-cover opacity-30"
                src="/images/splash.jpg"
                alt="CityRep"
            />
            <div className="relative z-10 flex h-full w-full flex-col items-center">
                <div className="flex h-[184px] w-full flex-col items-center pt-10 pb-4">
                    <div className="flex size-16 items-center justify-center rounded-full border border-primary-700 bg-[#2B2B31] text-primary-700">
                        <User2 className="size-8" />
                    </div>
                    <p className="mt-2 text-white">
                        {userData?.firstName} {userData?.lastName}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-white">
                        <p>{userData?.phoneNumber}</p>
                        <button
                            type="button"
                            onClick={() => setChangePhoneSheetOpen(true)}
                            className="flex size-8 items-center justify-center text-primary-700"
                            aria-label="تغییر شماره موبایل"
                            title="تغییر شماره موبایل"
                        >
                            <Pencil className="size-4" />
                        </button>
                    </div>
                </div>

                <div className="h-[calc(100%-184px)] w-[calc(100%+32px)] rounded-t-3xl bg-[#2B2B2B] p-4">
                    <div className="flex h-14 w-full items-center justify-between rounded-xl bg-[#121314] px-4">
                        <p className="text-primary-700">تاریخ تولد</p>
                        <p className="text-white">
                            {userData?.birthDay
                                ? moment(userData.birthDay, "YYYY-MM-DD").format("jYYYY/jMM/jDD")
                                : ""}
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() => setLogoutSheetOpen(true)}
                        className="mt-4 flex h-14 w-full items-center justify-start gap-3 rounded-full bg-white/8 hover:bg-white/10"
                    >
                        <LogOutIcon className="size-5 text-secondary-main" />
                        <p className="text-white">خروج</p>
                    </Button>
                </div>
            </div>

            <Sheet open={logoutSheetOpen} onOpenChange={setLogoutSheetOpen}>
                <SheetContent
                    side="bottom"
                    className="z-[100] mx-auto min-h-max max-w-xl rounded-t-3xl border-t border-white/10 bg-[#1a1a1a] pb-6"
                >
                    <SheetHeader className="border-b border-white/10 pb-4">
                        <SheetTitle className="text-right text-white">
                            خروج از حساب کاربری
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-6 px-4 py-6">
                        <p className="text-right text-sm text-white">
                            آیا از خروج خود اطمینان دارید؟
                        </p>
                    </div>
                    <SheetFooter className="grid grid-cols-2 flex-row gap-3 px-4 pt-4">
                        <SheetClose asChild>
                            <Button
                                variant="outline"
                                className="w-full rounded-full border-white/20 bg-transparent text-white"
                            >
                                انصراف
                            </Button>
                        </SheetClose>
                        <Button
                            type="button"
                            onClick={handleLogout}
                            className="w-full rounded-full bg-primary-main font-bold text-white hover:bg-secondary-main/90"
                        >
                            خروج
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            <ChangePhoneSheet
                currentPhoneNumber={userData?.phoneNumber}
                open={changePhoneSheetOpen}
                onOpenChange={setChangePhoneSheetOpen}
            />
        </div>
    )
}

export default ProfilePage
