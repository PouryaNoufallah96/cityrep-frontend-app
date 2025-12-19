import { useState } from "react"
import { useNavigate } from "react-router";
import CompleteProfileStep from "~/components/auth/CompleteProfileStep";
import InputMobileStep from "~/components/auth/inputMobileStep"
import VerifyStep from "~/components/auth/VerifyStep";
import { setSessionStorage } from "~/lib/utils";


type AuthStep = "input" | "verify" | "completeProfile";
type StepConfig = {
    component: React.ComponentType<any>;
    props?: Record<string, any>;
};

const AuthPage = () => {
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState<AuthStep>("input");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const verifyStep = () => {
        if (step === "input") {
            //check mobile format
            if (mobile.length === 11 && mobile.startsWith("09")) {
                setError(null);
                return true;
            } else {
                setError("شماره موبایل وارد شده معتبر نیست");
                return false;
            }
        }
    }
    const handleStepChange = () => {
        if (step === "input") {
            const verified = verifyStep();
            if (verified) {
                setStep("verify");
            }
        } else if (step === "verify") {
            setStep("completeProfile")
        } else {
            setSessionStorage(import.meta.env.VITE_TOKEN_KEY, "token");
            navigate('/')
        }
    }

    const handleResendCode = () => {

    }

    const steps: Record<AuthStep, StepConfig> = {
        input: {
            component: InputMobileStep,
            props: {
                mobile,
                setMobile,
                error,
                handleStepChange,
            },
        },
        verify: {
            component: VerifyStep,
            props: {
                error,
                handleBack: () => setStep("input"),
                handleStepChange,
                handleResend: handleResendCode,
            },
        },
        completeProfile: {
            component: CompleteProfileStep,
            props: {
                error,
                handleBack: () => setStep("input"),
                handleStepChange,
                handleResend: handleResendCode,
            },
        },
    };


    const StepComponent = steps[step].component;
    const stepProps = steps[step].props;

    return <StepComponent {...stepProps} />;

}
export default AuthPage
