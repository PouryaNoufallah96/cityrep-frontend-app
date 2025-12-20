type Props = {
    value: number;
    label?: string;
    onSelect: (value: string) => void;
    active?: boolean;
};

const PriceOptionButton = ({
                               value,
                               label,
                               onSelect,
                               active = false,
                           }: Props) => {
    return (
        <button
            onClick={() => onSelect(value.toString())}
            className={`
        flex items-center justify-center h-10 w-full rounded-[8px]
        border transition-all cursor-pointer
        ${
                active
                    ? "bg-[#E2DAFF] text-[#121314] border-[#E2DAFF]"
                    : "border-[#E2DAFF] text-[#E2DAFF]"
            }
      `}
        >
            {label ?? value.toLocaleString()} تومان
        </button>
    );
};

export default PriceOptionButton;
