import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getSessionStorage } from "~/lib/utils";
import { useGetClientData } from "~/reactQuery/auth/hooks";

export const useAuthGuard = (mode: "auth" | "guest") => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasToken = typeof window !== "undefined"
        && !!getSessionStorage(import.meta.env.VITE_TOKEN_KEY);
    const {
        data: clientData,
        isPending,
        isError,
        refetch,
    } = useGetClientData(hasToken);
    const [allowed, setAllowed] = useState(false);
    const [profileErrorVisible, setProfileErrorVisible] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        setAllowed(false);

        if (!hasToken) {
            setProfileErrorVisible(false);
            setIsRetrying(false);

            if (mode === "auth") {
                navigate("/auth", { replace: true });
                return;
            }

            setAllowed(true);
            return;
        }

        if (isError) {
            setProfileErrorVisible(true);
        } else if (clientData) {
            setProfileErrorVisible(false);
        }

        if (isPending || isError || !clientData) {
            return;
        }

        if (mode === "auth" && !clientData.isProfileCompleted) {
            navigate("/auth", { replace: true });
            return;
        }

        if (mode === "guest" && clientData.isProfileCompleted) {
            navigate("/", { replace: true });
            return;
        }

        setAllowed(true);
    }, [
        clientData,
        hasToken,
        isError,
        isPending,
        location.pathname,
        mode,
        navigate,
    ]);

    const retryProfile = async () => {
        setProfileErrorVisible(true);
        setIsRetrying(true);

        try {
            const result = await refetch();
            setProfileErrorVisible(result.isError || !result.data);
        } catch {
            setProfileErrorVisible(true);
        } finally {
            setIsRetrying(false);
        }
    };

    return {
        allowed,
        hasProfileError: hasToken && (profileErrorVisible || isError),
        retryProfile,
        isRetrying,
    };
};
