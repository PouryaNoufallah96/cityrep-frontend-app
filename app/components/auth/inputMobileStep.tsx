import {Mobile} from "react-coolicons";
import Logo from "~/components/shared/Logo";
import {Button} from "~/components/ui/button";
import TextInput from "~/components/ui/TextInput";
import {Spinner} from "~/components/ui/spinner";


type Props = {
    mobile: string;
    setMobile: (mobile: string) => void;
    error: string | null;
    handleStepChange: () => void;
    isLoading?: boolean;
}

const InputMobileStep = ({mobile, setMobile, error, handleStepChange, isLoading}: Props) => {
    return (
        <div
            className="bg-[#121314] w-full h-[100svh] flex flex-col items-center justify-between pt-[115px] pb-10 px-[30px]">
            <div>
                <Logo/>
                <p className="text-secondary-main mt-[30px] text-xl">هدف با تو، مسیرت با ما !</p>
            </div>
            <div className="w-full">
                <p className="text-center text-white font-bold text-xl mb-6">ورود | ثبت نام</p>
                <TextInput
                    value={mobile}
                    onChange={setMobile}
                    placeholder="شماره موبایل خود را وارد کنید"
                    error={error}
                    icon={<Mobile/>}
                    onClear={() => setMobile("")}
                />
            </div>

            <div className="w-full">
                <Button disabled={isLoading} onClick={handleStepChange}
                        className="text-white font-medium w-full h-12 rounded-full bg-primary-main">
                    {
                        isLoading && <Spinner/>
                    }
                    ارسال کد
                </Button>
            </div>


        </div>
    )
}
export default InputMobileStep;