import { ArrowRight, Banknote, Check, ChevronLeft, QrCode, XIcon } from "lucide-react"
import { useEffect, useRef, useState, type RefObject } from "react"
import { createPortal } from "react-dom"
import { CalendarDays, Clock, PaperPlane } from "react-coolicons"
import { useQueryClient } from "@tanstack/react-query"
import CheckoutItem from "~/components/gym/reserve/CheckoutItem"
import TrendIcon from "~/components/shared/TrendIcon"
import { useGetClientGymAttendanceStatus } from "~/reactQuery/gymAttendance/hooks"
import {
    GymAttendanceState,
    type ClientGymAttendanceItem
} from "~/reactQuery/gymAttendance/services"
import QRCode from "qrcode";
import { formatJalaliDate, formatMinutes, getGoogleMapsDirectionUrl } from "~/lib/utils"
import { Link, useNavigate } from "react-router"
import { gymServices } from "~/reactQuery/gym/services"

const QrGymItem = ({
    gym,
    fallbackFocusRef,
}: {
    gym: ClientGymAttendanceItem
    fallbackFocusRef: RefObject<HTMLDivElement | null>
}) => {
    const [showQr, setShowQr] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [qrSrc, setQrSrc] = useState<string | null>(null);
    const [isOpeningGym, setIsOpeningGym] = useState(false)
    const handledConfirmation = useRef(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)
    const dialogControlRef = useRef<HTMLButtonElement>(null)
    const gymLocation = gym.gymAddress?.geoLocation
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: attendanceStatus } = useGetClientGymAttendanceStatus(
        gym.gymAttendanceReference,
        showQr
    )

    const openGymDetail = async () => {
        if (isOpeningGym) return
        setIsOpeningGym(true)
        try {
            const data = await gymServices.getOneGym({ gymId: gym.gymId })
            if (data?.slug) {
                navigate(`/gyms/${data.slug}`)
            }
        } finally {
            setIsOpeningGym(false)
        }
    }

    useEffect(() => {
        if (!gym.gymAttendanceReference) return;

        QRCode.toDataURL(gym.gymAttendanceReference, {
            width: 160,
            margin: 1
        }).then(setQrSrc);
    }, [gym.gymAttendanceReference]);

    useEffect(() => {
        if (
            attendanceStatus?.gymAttendanceState !== GymAttendanceState.Used ||
            handledConfirmation.current
        ) {
            return;
        }

        handledConfirmation.current = true
        setShowSuccess(true)

        const removalTimer = window.setTimeout(async () => {
            setShowQr(false)
            await queryClient.invalidateQueries({
                queryKey: [
                    "clientGymAttendanceList",
                    { states: [GymAttendanceState.Reserved] },
                ],
                exact: true,
            })
            fallbackFocusRef.current?.focus()
        }, 3000)

        return () => window.clearTimeout(removalTimer)
    }, [attendanceStatus?.gymAttendanceState, fallbackFocusRef, queryClient])

    useEffect(() => {
        if (!showQr) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        dialogControlRef.current?.focus()

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                setShowQr(false)
                return
            }

            if (event.key !== "Tab") return

            const focusableElements = Array.from(
                dialogRef.current?.querySelectorAll<HTMLElement>(
                    "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"
                ) ?? []
            )

            if (focusableElements.length === 0) {
                event.preventDefault()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = previousOverflow
            triggerRef.current?.focus()
        }
    }, [showQr])

    useEffect(() => {
        if (showQr) {
            dialogControlRef.current?.focus()
        }
    }, [showQr, showSuccess])


    return (

        <>
            {showQr && createPortal(
                <div
                    ref={dialogRef}
                    dir="rtl"
                    role="dialog"
                    aria-modal="true"
                    aria-label="بلیت ورود به باشگاه"
                    className="fixed inset-0 z-[400] mx-auto flex h-[100svh] w-full max-w-xl flex-col items-center bg-radial-[50%_50%_at_50%_50%,_#36314D_0%,_#202020_100%] px-5 pt-5"
                >
                    {showSuccess ? (
                        <div
                            role="status"
                            className="flex min-h-24 w-full items-start gap-3 rounded-lg bg-success p-4 text-white"
                        >
                            <Check
                                aria-hidden="true"
                                className="mt-0.5 size-5 shrink-0 rounded-full bg-white p-0.5 text-success"
                            />
                            <p className="min-w-0 flex-1 text-sm font-medium leading-8">
                                ورود شما به «{gym.gymTitle}» با موفقیت انجام شد
                            </p>
                            <button
                                ref={dialogControlRef}
                                type="button"
                                aria-label="بستن پیام ورود موفق"
                                className="flex size-8 shrink-0 items-center justify-center"
                                onClick={() => setShowSuccess(false)}
                            >
                                <XIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    ) : (
                        <header className="flex h-10 w-full items-center justify-center">
                            <button
                                ref={dialogControlRef}
                                type="button"
                                aria-label="بستن بلیت ورود"
                                className="absolute right-5 flex size-10 items-center justify-center text-white"
                                onClick={() => setShowQr(false)}
                            >
                                <ArrowRight aria-hidden="true" />
                            </button>
                            <h2 className="text-base font-medium text-white">
                                بلیت ورود به باشگاه
                            </h2>
                        </header>
                    )}

                    <div className="flex flex-1 flex-col items-center justify-center pb-16">
                        {!showSuccess && (
                            <p className="mb-10 text-lg font-medium text-primary-700">
                                {gym.gymTitle}
                            </p>
                        )}
                        <div className="flex size-[280px] items-center justify-center rounded-[28px] border border-primary-700 p-4">
                            <div className="flex size-full items-center justify-center rounded-[20px] bg-white">
                            {qrSrc ? (
                                <img
                                    src={qrSrc}
                                    alt={`کد ورود به ${gym.gymTitle}`}
                                    className="size-52"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">در حال ساخت QR…</span>
                            )}
                            </div>
                        </div>
                        <p className="mt-10 text-white">
                            هنگام ورود به باشگاه اسکن کنید.
                        </p>
                    </div>
                </div>,
                document.body
            )
            }

            <div className="w-full bg-[#2B2B2B] rounded-[16px] flex-col gap-5 flex items-center justify-center p-4">
                <img src={import.meta.env.VITE_BASE_API + "/File/DownloadFile/" + gym.gymImageUrl} alt="" className="w-full aspect-[296/151] object-cover rounded-[8px]" />
                <div className="w-full items-center justify-between flex">
                    <div>
                        <p className="text-white">{gym.gymTitle}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-primary-700">
                            <TrendIcon
                                fileId={gym.gymTrendIconUrl}
                                className="size-4 shrink-0"
                            />
                            <p className="text-sm">{gym.gymTrendTitle}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2" dir="ltr">
                        <button
                            type="button"
                            onClick={openGymDetail}
                            disabled={isOpeningGym}
                            aria-label={`مشاهده ${gym.gymTitle}`}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#121314] text-primary-700 disabled:opacity-60"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        {gymLocation && (
                            <Link
                                to={getGoogleMapsDirectionUrl(
                                    gymLocation.latitude,
                                    gymLocation.longitude,
                                )}
                                target="_blank"
                                aria-label={`مسیریابی به ${gym.gymTitle}`}
                                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#121314] text-primary-700"
                            >
                                <PaperPlane />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="bg-[#121314] p-4 rounded-[16px] w-full gap-4 flex flex-col">
                    <CheckoutItem
                        icon={<CalendarDays className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                        label="تاریخ"
                        value={formatJalaliDate(gym.sessionDate)}
                    />
                    <CheckoutItem
                        icon={<Clock className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                        label="ساعت"
                        value={
                            `${formatMinutes(gym.gymStart)} تا ${formatMinutes(gym.gymEnd)}`
                        }
                    />

                    <CheckoutItem
                        icon={<Banknote className="text-[#A0A0A0] w-6 h-6 min-w-[24px]" />}
                        label="مبلغ"
                        value={
                            `${gym.sessionPrice.toLocaleString("fa-IR")} تومان`
                        }
                    />
                </div>
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setShowQr(true)}
                    className="text-[#B1FF68] bg-[#121314] w-full rounded-[16px] flex items-center justify-between p-4"
                >
                    <div className="flex gap-2 items-center">
                        <QrCode />
                        <p className="text-sm">مشاهده QR</p>
                    </div>
                    <ChevronLeft />
                </button>
            </div>
        </>
    )
}

export default QrGymItem
