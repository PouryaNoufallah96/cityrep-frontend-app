import type { ReactNode } from "react"

type Props = {
    icon: ReactNode,
    label: string;
}

const GymLabel = ({ icon, label }: Props) => {
    return (
        <div className="w-full flex items-center gap-4 text-white my-4">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center bg-[#B6A2FF14] text-primary-text">
                {icon}
            </div>
            <p className="text-sm">
                {label}
            </p>
        </div>
    )
}

export default GymLabel