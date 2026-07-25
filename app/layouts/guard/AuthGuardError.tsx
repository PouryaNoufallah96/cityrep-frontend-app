import { RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";

type AuthGuardErrorProps = {
    isRetrying: boolean;
    onRetry: () => void;
};

const AuthGuardError = ({ isRetrying, onRetry }: AuthGuardErrorProps) => (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-5 bg-[#121314] px-8 text-center">
        <p className="text-white">دریافت اطلاعات کاربری انجام نشد.</p>
        <Button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="h-12 rounded-full bg-primary-main px-8 text-white"
        >
            <RefreshCw className={isRetrying ? "animate-spin" : ""} />
            تلاش مجدد
        </Button>
    </div>
);

export default AuthGuardError;
