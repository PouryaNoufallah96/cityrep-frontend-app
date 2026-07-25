import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet";
import { Spinner } from "~/components/ui/spinner";
import TextInput from "~/components/ui/TextInput";
import { toEnglishDigits } from "~/lib/utils";
import {
    useRequestChangePhoneNumber,
    useVerifyChangePhoneNumber,
} from "~/reactQuery/auth/hooks";

type ChangePhoneSheetProps = {
    currentPhoneNumber?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const ChangePhoneSheet = ({
    currentPhoneNumber,
    open,
    onOpenChange,
}: ChangePhoneSheetProps) => {
    const [step, setStep] = useState<"phone" | "verify">("phone");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { mutateAsync: requestChange, isPending: isRequesting } =
        useRequestChangePhoneNumber();
    const { mutateAsync: verifyChange, isPending: isVerifying } =
        useVerifyChangePhoneNumber();

    const reset = () => {
        setStep("phone");
        setPhoneNumber("");
        setVerificationCode("");
        setError(null);
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            reset();
        }
        onOpenChange(nextOpen);
    };

    const handlePhoneChange = (value: string) => {
        const normalized = toEnglishDigits(value).replace(/\D/g, "").slice(0, 11);
        setPhoneNumber(normalized);
        setError(null);
    };

    const handleCodeChange = (value: string) => {
        const normalized = toEnglishDigits(value).replace(/\D/g, "").slice(0, 4);
        setVerificationCode(normalized);
        setError(null);
    };

    const handleRequest = async () => {
        if (phoneNumber.length !== 11 || !phoneNumber.startsWith("09")) {
            setError("شماره موبایل وارد شده معتبر نیست");
            return;
        }

        if (phoneNumber === currentPhoneNumber) {
            setError("شماره موبایل جدید باید با شماره فعلی متفاوت باشد");
            return;
        }

        try {
            const sent = await requestChange({ phoneNumber });
            if (!sent) {
                setError("ارسال کد تایید انجام نشد");
                return;
            }

            setStep("verify");
            setError(null);
        } catch {
            setError("ارسال کد تایید انجام نشد");
        }
    };

    const handleVerify = async () => {
        if (verificationCode.length !== 4) {
            setError("کد تایید باید ۴ رقم باشد");
            return;
        }

        try {
            const verified = await verifyChange({ verificationCode });
            if (!verified) {
                setError("کد تایید صحیح نیست");
                return;
            }

            toast.success("شماره موبایل با موفقیت تغییر کرد");
            handleOpenChange(false);
        } catch {
            setError("کد تایید صحیح نیست");
        }
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="bottom"
                className="z-[100] max-w-xl mx-auto rounded-t-[24px] border-t border-white/10 bg-[#1a1a1a] pb-6"
            >
                <SheetHeader className="border-b border-white/10 pb-4 text-right">
                    <SheetTitle className="text-right text-white">
                        تغییر شماره موبایل
                    </SheetTitle>
                    <SheetDescription className="text-right text-white/60">
                        {step === "phone"
                            ? "شماره موبایل جدید خود را وارد کنید."
                            : `کد ارسال شده به ${phoneNumber} را وارد کنید.`}
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4 pt-2">
                    {step === "phone" ? (
                        <TextInput
                            dir="ltr"
                            type="tel"
                            inputMode="numeric"
                            maxLength={11}
                            label="شماره موبایل جدید"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            placeholder="شماره موبایل جدید را وارد کنید"
                            error={error}
                        />
                    ) : (
                        <TextInput
                            dir="ltr"
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            label="کد تایید"
                            value={verificationCode}
                            onChange={handleCodeChange}
                            placeholder="کد ۴ رقمی را وارد کنید"
                            error={error}
                        />
                    )}
                </div>

                <SheetFooter className="px-4 pt-0">
                    <Button
                        onClick={step === "phone" ? handleRequest : handleVerify}
                        disabled={isRequesting || isVerifying}
                        className="h-12 w-full rounded-full bg-primary-main text-white"
                    >
                        {(isRequesting || isVerifying) && <Spinner />}
                        {step === "phone" ? "ارسال کد" : "تایید"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ChangePhoneSheet;
