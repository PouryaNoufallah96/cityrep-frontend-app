import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "~/components/ui/sheet"
import {StarIcon} from "lucide-react"
import {useEffect, useState} from "react"
import {Button} from "~/components/ui/button"
import {Slider} from "~/components/ui/slider"
import {toast} from "sonner"
import {useUpsertGymAttendanceRate} from "~/reactQuery/gymAttendance/hooks"
import {useNavigate} from "react-router"
import {cn} from "~/lib/utils"

const RATING_MAX = 5
const RATING_OPTIONS = [1, 2, 3, 4, 5] as const

type RateSheetProps = {
    image: string
    title: string
    gymAttendanceId: string
    open: boolean
    handleOpenChange: (open: boolean) => void
}

const RateSheet = ({
    image,
    title,
    gymAttendanceId,
    open,
    handleOpenChange,
}: RateSheetProps) => {
    const [selectedRate, setSelectedRate] = useState(0)
    const {mutateAsync, isPending} = useUpsertGymAttendanceRate()
    const navigate = useNavigate()

    useEffect(() => {
        if (open) setSelectedRate(0)
    }, [gymAttendanceId, open])

    const submitRate = async () => {
        if (selectedRate < 1 || isPending) return

        const result = await mutateAsync({
            gymAttendanceId,
            givenRate: selectedRate,
        })

        if (!result.isSuccess) {
            toast.error(result.message || "ثبت امتیاز انجام نشد.")
            return
        }

        handleOpenChange(false)
        navigate("/", {
            state: {
                ratingSuccessTitle: title,
            },
        })
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="bottom"
                className="dark z-[100] mx-auto flex h-auto max-h-[90svh] max-w-xl flex-col items-center gap-0 rounded-t-3xl border-none bg-card px-5 pb-8 pt-3 [&>button.absolute]:hidden"
            >
                <div className="mb-4 h-1 w-10 shrink-0 rounded-full bg-text-300" />

                <div className="flex w-full max-w-xs flex-col items-center">
                    <img
                        src={image}
                        alt={title}
                        className="h-56 w-full rounded-xl object-cover"
                    />

                    <div className="mt-6 flex flex-col items-center gap-2">
                        <SheetTitle className="text-center text-lg font-bold text-primary-700">
                            {title}
                        </SheetTitle>
                        <SheetDescription className="text-center text-sm leading-6 text-white">
                            تجربه استفاده از باشگاه چطور بود؟
                        </SheetDescription>
                    </div>

                    <div className="mt-8 flex w-full max-w-72 flex-col gap-3">
                        <div className="grid grid-cols-5">
                            {RATING_OPTIONS.map((rate) => {
                                const isActive = rate <= selectedRate

                                return (
                                    <button
                                        type="button"
                                        key={rate}
                                        onClick={() => setSelectedRate(rate)}
                                        aria-label={`${rate} ستاره`}
                                        aria-pressed={isActive}
                                        className="flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
                                    >
                                        <StarIcon
                                            className={cn(
                                                "size-6 transition-colors",
                                                isActive
                                                    ? "fill-secondary-main text-secondary-main"
                                                    : "fill-transparent text-secondary-main",
                                            )}
                                        />
                                    </button>
                                )
                            })}
                        </div>

                        <Slider
                            min={0}
                            max={RATING_MAX}
                            step={1}
                            value={selectedRate}
                            onValueChange={setSelectedRate}
                            aria-label="انتخاب امتیاز باشگاه"
                            aria-valuetext={
                                selectedRate === 0
                                    ? "امتیازی انتخاب نشده"
                                    : `${selectedRate} از ${RATING_MAX}`
                            }
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={submitRate}
                        disabled={selectedRate < 1 || isPending}
                        className="mt-10 h-12 w-full rounded-full bg-primary-main text-base font-medium text-white"
                    >
                        {isPending ? "در حال ثبت..." : "ثبت امتیاز"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RateSheet
