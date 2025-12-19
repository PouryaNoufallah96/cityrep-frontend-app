import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
    title: string
    handleBack?: () => void;
    leftComponent?: ReactNode;
    className?: string;
}
const Navigator = ({ title, className, handleBack, leftComponent }: Props) => {
    const navigate = useNavigate();
    return (
        <div className={`h-12 text-white w-full flex items-center justify-between ${className}`}>
            <button className="cursor-pointer" onClick={() => {
                if (handleBack) {
                    handleBack();
                }
                else {
                    navigate(-1);
                }
            }}><ChevronRight /></button>
            <div>{title}</div>
            <div>{leftComponent}</div>
        </div>
    )
}

export default Navigator;