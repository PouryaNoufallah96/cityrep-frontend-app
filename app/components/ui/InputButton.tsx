import { X } from "lucide-react";

type InputButtonProps = {
    label?: string;
    value: string;
    onClick: () => void;
    placeholder?: string;
    error?: string | null;
    icon?: React.ReactNode;
    onClear?: () => void;
};


const InputButton = ({
    label,
    value,
    onClick,
    placeholder,
    error,
    icon,
}: InputButtonProps) => {
    return (
        <div className="w-full">
            {label &&
                <div className="flex items-center mb-2 h-[22px]">
                    <div className={`w-2 h-2 rounded-full ${error ? "bg-red-600" : value.length > 0 ? "bg-green-400" : "bg-[#858585]"} ml-2`} />
                    <p className="text-white text-sm">{label}</p>
                </div>
            }
            <button onClick={onClick}
                className={`w-full cursor-pointer h-12 gap-2 rounded-full flex items-center justify-between px-5 py-3 transition
          ${error ? "border-red-500" : "border-white/40"}
          bg-white/8 border`}
            >

                <p className={value ? "text-white" : "text-white/40"}>
                    {value || placeholder}
                </p>
                {icon && <span className="text-white/40">{icon}</span>}
            </button>

            <p className="text-red-500 mt-3 h-6 text-sm">{error}</p>
        </div>
    );
};

export default InputButton;
