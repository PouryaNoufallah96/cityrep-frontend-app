import { useState, type ReactNode } from "react";
import { PaperPlane } from "react-coolicons";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { ExclamationIcon } from "~/assets/icons/exclamation";
import Checkout from "~/components/gym/reserve/Checkout";
import Result from "~/components/gym/reserve/Result";
import SelectDateTime from "~/components/gym/reserve/SelectDateTime";
import SelectTrend from "~/components/gym/reserve/SelectTrend";
import Navigator from "~/components/shared/Navigator";
import { Button } from "~/components/ui/button";

type reserveGymSteps = "trend" | "dateTime" | "checkout" | "result";
const ReserveGym = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [SelectedTrend, setSelectedTrend] = useState<number | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<{
        id: number,
        timeId: number
    } | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const steps: { name: reserveGymSteps, title: string, component: ReactNode }[] = [{
        name: "trend",
        title: t("gym.reserve.steps.trend"),
        component: <SelectTrend
            errors={errors}
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
            setSelectedDateTime={(dateTime) => {
                setSelectedDateTime(dateTime);
                setErrors([]);
            }}
            selectedDateTime={selectedDateTime}
        />
    }, {
        name: "checkout",
        title: t("gym.reserve.steps.checkout"),
        component: <Checkout
            SelectedTrend={SelectedTrend}
            selectedDateTime={selectedDateTime}
            gymName="باشگاه اکسیژن"
        />
    }, {
        name: "result",
        title: t("gym.reserve.steps.result"),
        component: <Result handleClose={() => {
            navigate("/")
        }} />
    }];
    const { gym_id } = useParams<{ gym_id: string }>();
    const [step, setStep] = useState<reserveGymSteps>("trend");

    const handleBack = () => {
        const currentIndex = steps.findIndex(s => s.name === step);
        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1].name);
        }
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
                if (selectedDateTime === null || !selectedDateTime.id || !selectedDateTime.timeId) {
                    flag = false;
                    setErrors([t("gym.reserve.errors.selectDateTime")]);
                }
                break;
            case "checkout":
                //validate checkout info
                break;
            case "result":
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
            <div className="w-full">
                {step !== "result" && <Navigator title={steps.find(s => s.name === step)?.title || ""} handleBack={handleBack} />}
                {steps.find(s => s.name === step)?.component}
            </div>
            <div className={`w-full px-4 ${step === "result" ? "mt-4" : ""}`}>
                {step === "checkout" && <div className="flex gap-2 bg-[#61481366] w-full p-4 rounded-[6px] mb-4 ">
                    <ExclamationIcon className="min-w-[24px]" />
                    <p className="text-sm text-[#FEF9C3]">
                        سانسی که رزرو می‌کنید تنها در تاریخ و ساعت رزرو شده معتبر است و پس از آن منقضی می‌‍شود.
                    </p>
                </div>}
                <Button
                    onClick={handleNext}
                    className="text-white font-medium w-full h-12 rounded-full bg-primary-main"
                >
                    {
                        step === "result" ? <div className="flex gap-2 items-center"><PaperPlane /><p>{t("gym.reserve.buttons.navigate")}</p></div> : step === "checkout" ?
                            t("gym.reserve.buttons.reserve")
                            : t("gym.reserve.buttons.next")
                    }
                </Button>
            </div>
        </div>

    )
};
export default ReserveGym;