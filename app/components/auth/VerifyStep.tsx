import { useEffect, useRef, useState } from "react";
import Navigator from "~/components/shared/Navigator";
import { Button } from "~/components/ui/button";
import {Spinner} from "~/components/ui/spinner";

type Props = {
    error: string | null;
    handleStepChange: (otp: string) => void;
    handleBack: () => void;
    handleResend: () => void;
    isLoading?: boolean;
};


const OTP_LENGTH = 4;
const RESEND_TIME = 5;
const MAX_RESEND_COUNT = 2;

const VerifyStep = ({ error, isLoading, handleStepChange, handleBack, handleResend }: Props) => {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const [timeLeft, setTimeLeft] = useState(RESEND_TIME);
    const [canResend, setCanResend] = useState(false);
    const [resendCount, setResendCount] = useState(0);

    const focusInput = (index: number) => {
        inputsRef.current[index]?.focus();
    };

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < OTP_LENGTH - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            focusInput(index - 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const newOtp = pasted.split("");
        setOtp((prev) => {
            const filled = [...prev];
            newOtp.forEach((char, i) => {
                filled[i] = char;
            });
            return filled;
        });

        const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
        focusInput(nextIndex);
    };

    const submitHandler = () => {
        const code = otp.join("");
        if (code.length !== OTP_LENGTH) return;
        handleStepChange(code);
    };

    const handleResendClick = () => {
        if (!canResend || resendCount >= MAX_RESEND_COUNT) return;

        setOtp(Array(OTP_LENGTH).fill(""));
        setTimeLeft(RESEND_TIME);
        setCanResend(false);
        setResendCount((prev) => prev + 1);
        focusInput(0);

        handleResend();
    };



    useEffect(() => {
        if (timeLeft === 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);


    useEffect(() => {
        focusInput(0);
    }, []);


    return (
        <div className="bg-[#121314] w-full h-[100svh] flex flex-col items-center justify-between pt-4 pb-10 px-[30px]">
            <Navigator handleBack={handleBack} title="ارسال کد" />

            <div className="w-full text-center">
                <p className="mb-6 text-white">کد ارسال شده را وارد کنید</p>

                <div className="w-full flex items-center flex-row-reverse justify-center gap-4">
                    {otp.map((value, index) => (
                        <div
                            key={index}
                            className={`w-12 h-12 rounded-full border bg-white/24 ${value.length > 0 ? "border-[2px] border-primary-100" : "border-white/60"}`}
                        >
                            <input
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="size-full rounded-full text-center text-white text-xl outline-none bg-transparent"
                            />
                        </div>
                    ))}
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {resendCount >= MAX_RESEND_COUNT ? (
                    <p className="mt-10 text-white/40 text-sm">
                        حداکثر تعداد ارسال مجدد انجام شد
                    </p>
                ) : !canResend ? (
                    <p className="text-white/60 mt-10">
                        <span className="font-medium text-white">
                            00:{String(timeLeft).padStart(2, "0")}
                        </span>
                    </p>
                ) : (
                    <button
                        onClick={handleResendClick}
                        className="cursor-pointer mt-10 text-secondary-main font-medium"
                    >
                        ارسال مجدد کد
                    </button>
                )}


            </div>

            <div className="w-full">
                <Button
                    onClick={submitHandler}

                    className="text-white font-medium w-full h-12 rounded-full bg-primary-main"
                    disabled={otp.join("").length !== OTP_LENGTH || isLoading}
                >
                    {
                        isLoading && <Spinner/>
                    }
                    تایید
                </Button>

                <button
                    onClick={handleBack}
                    className="cursor-pointer w-full mt-5 text-primary-100 font-medium"
                    disabled={isLoading}
                >
                    تغییر شماره موبایل
                </button>
            </div>


        </div>
    );
};

export default VerifyStep;
