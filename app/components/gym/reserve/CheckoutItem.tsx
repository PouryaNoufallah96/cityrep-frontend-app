
interface CheckoutItemProps {
    label?: string;
    value?: string;
    icon: React.ReactNode;
}

export default function CheckoutItem({
    label = "تاریخ",
    value = "",
    icon,
}: CheckoutItemProps) {
    return (
        <div className="flex items-center justify-center w-full">
            {icon}

            <p className="text-[#A0A0A0] text-sm mx-2">{label}</p>

            <div className="h-px flex-1 border-dashed border border-[#A0A0A0]" />

            <p className="text-white text-sm text-nowrap pr-2">{value}</p>
        </div>
    );
}
