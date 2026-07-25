import { useMemo, useState, type ReactNode } from "react";
import { PaperPlane } from "react-coolicons";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { ExclamationIcon } from "~/assets/icons/exclamation";
import Checkout, { findSelectedSession } from "~/components/gym/reserve/Checkout";
import Result from "~/components/gym/reserve/Result";
import SelectDateTime from "~/components/gym/reserve/SelectDateTime";
import SelectTrend from "~/components/gym/reserve/SelectTrend";
import Navigator from "~/components/shared/Navigator";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import {
    formatJalaliDate,
    formatMinutes,
    getGoogleMapsDirectionUrl,
    getSessionEndDate,
} from "~/lib/utils";
import { DepositState } from "~/reactQuery/deposit/services";
import { useVerifyDeposit } from "~/reactQuery/deposit/hooks";
import { useGetGymBySlug } from "~/reactQuery/gym/hooks";
import { useCreateGymAttendance } from "~/reactQuery/gymAttendance/hooks";
import { GymAttendanceState, type CreateymAttendanceResponse } from "~/reactQuery/gymAttendance/services";

type reserveGymSteps = "trend" | "dateTime" | "checkout" | "result";
const ReserveGym = () => {
    const { t } = useTranslation();
    const { gym_id } = useParams<{ gym_id: string }>();
    const { data: gym } = useGetGymBySlug(gym_id || "");
    const navigate = useNavigate();
    const [SelectedTrend, setSelectedTrend] = useState<string | null>(null);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [attendanceReference, setAttendanceReference] = useState<string>("");
    const { mutateAsync: reserve, isPending: reserveLoading } = useCreateGymAttendance()
    const { mutateAsync: verifyDeposit, isPending: verifyDepositLoading } = useVerifyDeposit();
    const selectedSession = useMemo(
        () => findSelectedSession(gym, SelectedTrend, selectedSessionId),
        [SelectedTrend, gym, selectedSessionId],
    );
    const sessionExpiresAt = selectedSession
        ? getSessionEndDate(
            selectedSession.dayOfWeek,
            selectedSession.session.to,
        )
        : null;
    const steps: { name: reserveGymSteps, title: string, component: ReactNode }[] = [{
        name: "trend",
        title: t("gym.reserve.steps.trend"),
        component: <SelectTrend
            errors={errors}
            gym={gym}
            setSelectedTrend={(trend) => {
                setSelectedTrend(trend);
                setErrors([]);
            }}
            SelectedTrend={SelectedTrend}
        />
    }, {
        name: "dateTime",
        title: t("gym.reserve.steps.dateTime"),
        component: <SelectDateTime
            errors={errors}
            setSelectedSessionId={(sessionId) => {
                setSelectedSessionId(sessionId);
                setErrors([]);
            }}
            selectedSessionId={selectedSessionId}
            gym={gym}
            selectedTrend={SelectedTrend}
        />
    }, {
        name: "checkout",
        title: t("gym.reserve.steps.checkout"),
        component: <Checkout
            SelectedTrend={SelectedTrend}
            selectedSessionId={selectedSessionId}
            gym={gym}
        />
    }, {
        name: "result",
        title: t("gym.reserve.steps.result"),
        component: <Result handleClose={() => {
            navigate("/")
        }}
            attendanceReference={attendanceReference}
        />
    }];

    const [step, setStep] = useState<reserveGymSteps>("trend");

    const handleBack = () => {
        const currentIndex = steps.findIndex(s => s.name === step);
        switch (step) {
            case "dateTime":
                setSelectedSessionId(null);
        }

        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1].name);
        } else {
            navigate(-1);
        }
    }

    const handleReserve = async () => {
        let response: CreateymAttendanceResponse;

        try {
            response = await reserve({
                gymId: gym?.gymId || "",
                gymTrendId: SelectedTrend?.split('-')[0] || "",
                gymSessionId: selectedSessionId || ""
            });
        } catch {
            setErrors(["رزرو انجام نشد. لطفاً دوباره تلاش کنید."]);
            return;
        }

        if (response.state === GymAttendanceState.Reserved) {
            setAttendanceReference(response.attendanceReference);
            setStep("result");
            return;
        }

        if (response.state === GymAttendanceState.Pending) {
            if (!response.depositReference) {
                setErrors(["اطلاعات پرداخت رزرو دریافت نشد. لطفاً دوباره تلاش کنید."]);
                return;
            }

            try {
                const deposit = await verifyDeposit({
                    depositReference: response.depositReference,
                });

                if (deposit.state === DepositState.Done) {
                    setAttendanceReference(response.attendanceReference);
                    setStep("result");
                    return;
                }

                setErrors(["پرداخت رزرو ناموفق بود. لطفاً دوباره تلاش کنید."]);
            } catch {
                setErrors(["پرداخت رزرو ناموفق بود. لطفاً دوباره تلاش کنید."]);
            }
            return;
        }

        setErrors(["امکان تکمیل این رزرو وجود ندارد. لطفاً دوباره تلاش کنید."]);
    }
    const handleNext = () => {
        let flag = true;
        setErrors([]);
        //add validation for each step here
        switch (step) {
            case "trend":
                //validate trend selection
                if (SelectedTrend === null) {
                    flag = false;
                    setErrors([t("gym.reserve.errors.selectTrend")]);
                }
                break;
            case "dateTime":
                //validate date time selection
                if (!selectedSessionId) {
                    flag = false;
                    setErrors([t("gym.reserve.errors.selectDateTime")]);
                }
                break;
            case "checkout":
                handleReserve()
                return;
                //validate checkout info
                break;
            case "result":
                gym &&
                    window.open(
                        getGoogleMapsDirectionUrl(
                            gym.address.geoLocation.latitude,
                            gym.address.geoLocation.longitude
                        ),
                        "_blank"
                    );
                //no validation
                break;
        }
        if (!flag) return;

        const currentIndex = steps.findIndex(s => s.name === step);
        if (currentIndex < steps.length - 1) {
            setStep(steps[currentIndex + 1].name);
        }
    }
    return (
        <div className={`w-full bg-[#2B2B2B] pb-6 h-[100svh] overflow-auto my-scroll ${step !== "result" ? "px-4" : ""} flex flex-col items-center justify-between`}>
            <div className="w-full h-[calc(100svh-110px)] overflow-auto my-scroll">
                {step !== "result" && <Navigator className="sticky top-0 bg-[#2B2B2B]" title={steps.find(s => s.name === step)?.title || ""} handleBack={handleBack} />}
                {steps.find(s => s.name === step)?.component}
            </div>
            <div className={`w-full px-4 ${step === "result" ? "mt-4" : ""}`}>
                {step === "checkout" && <div className="flex gap-2 bg-[#61481366] w-full p-4 rounded-[6px] mb-4 ">
                    <ExclamationIcon className="min-w-[24px]" />
                    <p className="text-sm text-[#FEF9C3]">
                        {sessionExpiresAt && selectedSession
                            ? t("gym.reserve.expiryWarning", {
                                date: formatJalaliDate(sessionExpiresAt),
                                time: formatMinutes(selectedSession.session.to),
                            })
                            : t("gym.reserve.expiryWarningFallback")}
                    </p>
                </div>}
                <Button
                    onClick={handleNext}
                    className="text-white font-medium w-full h-12 rounded-full bg-primary-main"
                    disabled={reserveLoading || verifyDepositLoading}
                >
                    {
                        reserveLoading || verifyDepositLoading ?
                            <Spinner />
                            :
                            step === "result" ? <div className="flex gap-2 items-center"><PaperPlane /><p>{t("gym.reserve.buttons.navigate")}</p></div> : step === "checkout" ?
                                t("gym.reserve.buttons.reserve")
                                : t("gym.reserve.buttons.next")
                    }
                </Button>
                {step === "checkout" && errors.length > 0 && (
                    <div className="text-destructive text-sm mt-2">
                        {errors.map((error) => (
                            <div key={error}>{error}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
};
export default ReserveGym;
