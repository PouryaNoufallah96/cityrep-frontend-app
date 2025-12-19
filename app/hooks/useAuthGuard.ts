import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router";
import {getSessionStorage} from "~/lib/utils";

/**
 * Handles both "auth" (requires token) and "guest" (must NOT have token) modes.
 * Prevents flashing by returning a "checked" state.
 */
export const useAuthGuard = (mode: "auth" | "guest") => {
    const navigate = useNavigate();
    const location = useLocation();
    const [checked, setChecked] = useState<boolean>();

    useEffect(() => {
        if (typeof document === "undefined") return;

        const hasToken = !!getSessionStorage(import.meta.env.VITE_TOKEN_KEY);
        if (mode === "auth" && !hasToken) {
            navigate("/auth", {replace: true});
            return; // don’t mark as checked to block rendering
        }

        if (mode === "guest" && hasToken) {
            navigate("/", {replace: true});
            return;
        }

        // Safe to render
        setChecked(true);
    }, [mode, navigate, location.pathname]);

    return checked;
};
