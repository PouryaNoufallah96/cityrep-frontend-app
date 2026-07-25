import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import CompleteProfileStep, { type ProfileFormData } from "~/components/auth/CompleteProfileStep";
import InputMobileStep from "~/components/auth/inputMobileStep"
import VerifyStep from "~/components/auth/VerifyStep";
import { getSessionStorage, setSessionStorage } from "~/lib/utils";
import {
    useGetClientData,
    useRequestVerificationCode,
    useUpsertProfileData,
    useVerifyAndLogin,
} from "~/reactQuery/auth/hooks";


type AuthStep = "input" | "verify" | "completeProfile";
type StepConfig = {
    component: React.ComponentType<any>;
    props?: Record<string, any>;
};

const AuthPage = () => {
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState<AuthStep>(() =>
        getSessionStorage(import.meta.env.VITE_TOKEN_KEY)
            ? "completeProfile"
            : "input"
    );
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const { mutateAsync: requestCode, isPending: isloadingRequest } = useRequestVerificationCode()
    const { mutateAsync: verifyCode, isPending: isLoadingVerify } = useVerifyAndLogin()
    const { mutateAsync: updateProfile, isPending: isLoadingUpdateProfile } = useUpsertProfileData()
    const { refetch: refetchClientData } = useGetClientData(false);

    const verifyStep = () => {
        if (step === "input") {
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
                try {
                    const sent = await requestCode({ phoneNumber: mobile });
                    if (!sent) {
                        setError("ارسال کد تایید انجام نشد");
                        return;
                    }
                    setStep("verify");
                } catch {
                    setError("ارسال کد تایید انجام نشد");
                }
            }
        } else if (step === "verify") {
            setError(null);
            if (code) {
                try {
                    const res = await verifyCode({
                        phoneNumber: mobile,
                        verificationCode: code
                    })
                    setSessionStorage(import.meta.env.VITE_TOKEN_KEY, res.access_token);
                    const { data: clientData } = await refetchClientData();

                    if (!clientData) {
                        setError("دریافت اطلاعات کاربری انجام نشد");
                        return;
                    }

                    if (clientData.isProfileCompleted) {
                        navigate('/');
                        return;
                    }

                    setStep("completeProfile")
                } catch {
                    setError("کد تایید صحیح نیست")
                }
            }
        } else {
            if (profileData) {
                try {
                    const clientData = await updateProfile({
                        FirstName: profileData.firstName,
                        LastName: profileData.lastName,
                        gender: profileData.gender || "Male",
                        birthDay: profileData.birthDay
                    })

                    if (!clientData.isProfileCompleted) {
                        setError("تکمیل اطلاعات هویتی انجام نشد");
                        return;
                    }

                    navigate('/')
                } catch {
                    setError("تکمیل اطلاعات هویتی انجام نشد");
                }
            }
        }
    }

    const handleResendCode = async () => {
        setError(null);
        try {
            const sent = await requestCode({ phoneNumber: mobile });
            if (!sent) {
                throw new Error();
            }
        } catch (requestError) {
            setError("ارسال مجدد کد انجام نشد");
            throw requestError;
        }
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
                isResending: isloadingRequest,
            },
        },
        completeProfile: {
            component: CompleteProfileStep,
            props: {
                handleBack: () => setStep("input"),
                isLoading: isLoadingUpdateProfile,
                error,
                handleStepChange: (form: ProfileFormData) => handleStepChange({ profileData: form }),
            },
        },
    };


    const StepComponent = steps[step].component;
    const stepProps = steps[step].props;

    return <StepComponent {...stepProps} />;

}
export default AuthPage
