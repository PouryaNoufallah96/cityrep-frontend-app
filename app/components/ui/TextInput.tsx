import { X } from "lucide-react";

type TextInputProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string | null;
    icon?: React.ReactNode;
    onClear?: () => void;
};


const TextInput = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    icon,
    onClear,
}: TextInputProps) => {
    return (
        <div className="w-full">
            {label &&
                <div className="flex items-center mb-2 h-[22px]">
                    <div className={`w-2 h-2 rounded-full ${error?"bg-red-600":value.length>0?"bg-green-400":"bg-[#858585]"} ml-2`} />
                    <p className="text-white text-sm">{label}</p>
                </div>
            }

            <div
                className={`w-full h-12 gap-2 rounded-full flex items-center px-5 py-3 transition
          ${error ? "border-red-500" : "border-white/40"}
          bg-white/8 border`}
            >
                {icon && <span className="text-white">{icon}</span>}

                {icon && <div className="w-px h-6 bg-white" />}

                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={`bg-transparent outline-none ${icon ? "px-3" : ""} w-full text-white
            placeholder:text-white placeholder:opacity-50`}
                />

                {onClear && (
                    <div
                        onClick={onClear}
                        className={`transition-opacity cursor-pointer ${value.length > 0 ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <X className="text-white" />
                    </div>
                )}
            </div>

            <p className="text-red-500 mt-3 h-6 text-sm">{error}</p>
        </div>
    );
};

export default TextInput;
