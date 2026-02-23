import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import CompleteProfileStep, { type ProfileFormData } from "~/components/auth/CompleteProfileStep";
import InputMobileStep from "~/components/auth/inputMobileStep"
import VerifyStep from "~/components/auth/VerifyStep";
import { setSessionStorage } from "~/lib/utils";
import { useRequestVerificationCode, useUpsertProfileData, useVerifyAndLogin } from "~/reactQuery/auth/hooks";


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
    const { mutateAsync: requestCode, isPending: isloadingRequest } = useRequestVerificationCode()
    const { mutateAsync: verifyCode, isPending: isLoadingVerify } = useVerifyAndLogin()
    const { mutateAsync: updateProfile, isPending: isLoadingUpdateProfile } = useUpsertProfileData()
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
    const handleStepChange = async ({ code, profileData }: { code?: string, profileData?: ProfileFormData }) => {
        if (step === "input") {
            const verified = verifyStep();
            if (verified) {
                await requestCode({
                    phoneNumber: mobile
                })
                setStep("verify");
            }
        } else if (step === "verify") {
            console.log(code)
            setError(null);
            if (code) {
                try {
                    const res = await verifyCode({
                        phoneNumber: mobile,
                        verificationCode: code
                    })
                    setSessionStorage(import.meta.env.VITE_TOKEN_KEY, ` ${res.access_token}`);
                    if (res.hasProfile) {
                        navigate('/')
                    } else {
                        setStep("completeProfile")
                    }
                } catch (e) {
                    setError("کد تایید صحیح نیست")
                }
            }
        } else {
            if (profileData) {
                try {
                    await updateProfile({
                        FirstName: profileData.firstName,
                        LastName: profileData.lastName,
                        gender: profileData.gender || "Male",
                        birthDay: profileData.birthDay
                    })
                    navigate('/')
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const handleResendCode = () => {
        setError(null);

    }

    useEffect(() => {
        setError(null);

    }, [step]);

    const steps: Record<AuthStep, StepConfig> = {
        input: {
            component: InputMobileStep,
            props: {
                mobile,
                setMobile,
                isLoading: isloadingRequest,
                error,
                handleStepChange,
            },
        },
        verify: {
            component: VerifyStep,
            props: {
                error,
                handleBack: () => setStep("input"),
                handleStepChange: (code: string) => handleStepChange({ code }),
                isLoading: isLoadingVerify,
                handleResend: handleResendCode,
            },
        },
        completeProfile: {
            component: CompleteProfileStep,
            props: {
                handleBack: () => setStep("input"),
                isLoading: isLoadingUpdateProfile,
                handleStepChange: (form: ProfileFormData) => handleStepChange({ profileData: form }),
            },
        },
    };


    const StepComponent = steps[step].component;
    const stepProps = steps[step].props;

    return <StepComponent {...stepProps} />;

}
export default AuthPage
