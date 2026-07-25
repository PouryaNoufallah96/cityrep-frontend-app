import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";


type Props = {
    className?: string,
    parentClassName?: string,
    children?: React.ReactNode,
    onClick?: () => void,
    color?: "primary" | "secondary"
    loading?: boolean
}
const CustomButton = ({ className, onClick, parentClassName, children, color, loading }: Props) => {

    return (
        <div
            className={cn(
                color === "secondary"
                    ? "from-secondary-500/8 via-secondary-500 to-secondary-500/8"
                    : "from-primary-glow/8 via-primary-glow to-primary-glow/8",
                "backdrop-blur-2xl bg-linear-to-r p-px flex items-center justify-center",
                parentClassName)}>
            <Button disabled={loading} onClick={onClick} variant={color === "secondary" ? "alter" : "main"} className={cn("w-full h-full", className)}>
                {loading && <Spinner />}
                {children}
            </Button>
        </div>

    )
}

export default CustomButton;
