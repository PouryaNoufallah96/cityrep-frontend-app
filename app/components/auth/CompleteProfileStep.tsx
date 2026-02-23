import { Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navigator from "~/components/shared/Navigator";
import SelectSheet from "~/components/shared/SelectSheet";
import { Button } from "~/components/ui/button";
import InputButton from "~/components/ui/InputButton";
import TextInput from "~/components/ui/TextInput";
import JalaaliDatePickerSheet from "~/components/shared/JalaaliDatePickerSheet";
import moment from "moment-jalaali";

type Props = {
    error: string | null;
    handleStepChange: (data: any) => void;
    handleBack: () => void;
    handleResend: () => void;
};

type Gender = "Male" | "Female" | "";

export type ProfileFormData = {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDay: string; // YYYY-MM-DD
};

const CompleteProfileStep = ({ handleStepChange, handleBack }: Props) => {
    const [form, setForm] = useState<ProfileFormData>({
        firstName: "",
        lastName: "",
        gender: "",
        birthDay: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
    const [genderSheetOpen, setGenderSheetOpen] = useState(false);
    const [dateSheetOpen, setDateSheetOpen] = useState(false);

    const updateField = <K extends keyof ProfileFormData>(
        key: K,
        value: ProfileFormData[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!form.firstName.trim()) newErrors.firstName = "نام الزامی است";
        if (!form.lastName.trim()) newErrors.lastName = "نام خانوادگی الزامی است";
        if (!form.gender) newErrors.gender = "جنسیت را انتخاب کنید";
        if (!form.birthDay) newErrors.birthDay = "تاریخ تولد را وارد کنید";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const submitHandler = () => {
        if (!validateForm()) return;
        handleStepChange(form);
    };



    return (
        <div className="bg-[#121314] w-full h-[100svh] flex flex-col items-center justify-between pt-4 pb-10 px-[30px]">
            <Navigator handleBack={handleBack} title="اطلاعات هویتی" />

            <div className="w-full flex flex-col gap-5">
                <TextInput
                    label="نام"
                    value={form.firstName}
                    onChange={(v) => updateField("firstName", v)}
                    placeholder="نام خود را وارد کنید"
                    error={errors.firstName}
                    onClear={() => updateField("firstName", "")}
                />

                <TextInput
                    label="نام خانوادگی"
                    value={form.lastName}
                    onChange={(v) => updateField("lastName", v)}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    error={errors.lastName}
                    onClear={() => updateField("lastName", "")}
                />

                <InputButton
                    label="جنسیت"
                    value={form.gender === "Male" ? "مرد" : form.gender === "Female" ? "زن" : ""}
                    onClick={() => setGenderSheetOpen(true)}
                    placeholder="جنسیت خود را انتخاب کنید"
                    error={errors.gender}
                    onClear={() => updateField("gender", "")}
                    icon={<ChevronDown />}
                />

                <InputButton
                    label="تاریخ تولد"
                    value={form.birthDay ? moment(form.birthDay, "YYYY-MM-DD").format("jYYYY/jMM/jDD") : ""}
                    onClick={() => setDateSheetOpen(true)}
                    placeholder="تاریخ تولد خود را انتخاب کنید"
                    error={errors.birthDay}
                    onClear={() => updateField("birthDay", "")}
                    icon={<Calendar />}
                />



            </div>

            <div className="w-full">
                <Button
                    onClick={submitHandler}
                    className="text-white font-medium w-full h-12 rounded-full bg-primary-main"
                >
                    تایید
                </Button>


            </div>


            <SelectSheet
                open={genderSheetOpen}
                title="جنسیت"
                onChange={(value) => {
                    updateField("gender", value as Gender);
                    setGenderSheetOpen(false);
                }}
                value={form.gender}
                options={[
                    { label: "زن", value: "Female" },
                    { label: "مرد", value: "Male" },
                ]}
            />

            <JalaaliDatePickerSheet
                open={dateSheetOpen}
                onClose={() => setDateSheetOpen(false)}
                value={form.birthDay}
                onChange={(date) => updateField("birthDay", date)}
                title="تاریخ تولد"
            />
        </div>
    );
};

export default CompleteProfileStep;
