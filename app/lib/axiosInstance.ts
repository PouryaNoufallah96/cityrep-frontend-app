import axios, {AxiosHeaders} from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import { getSessionStorage } from "~/lib/utils";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BASE_API;

const makeHeader = (
    hasBody: boolean = false,
    customHeaders?: Record<string, string>
) => {
    const nonce = Date.now().toString() + (Math.random() * 1000000000).toFixed();

    const signature = Base64.stringify(
        hmacSHA256(nonce, import.meta.env.VITE_OAUTH_KEY || "")
    );

    const headers: Record<string, string> = {
        Accept: "application/json",
        Nonce: nonce,
        Signature: signature,
        ApplicationId: import.meta.env.VITE_APPLICATION_ID || "",
        ...customHeaders,
    };

    if (hasBody) headers["Content-Type"] = "application/json";

    return headers;
};

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});


axiosInstance.interceptors.request.use((config) => {
    const token = getSessionStorage(import.meta.env.VITE_TOKEN_KEY) ;
    const hasBody = !!config.data;

    const headers = new AxiosHeaders({
        ...makeHeader(hasBody, config.headers as Record<string, string>),
    });

    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (hasBody) headers.set("Content-Type", "application/json");

    config.headers = headers;

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        toast.error(
            error.response?.data?.message
            || error.response?.data?.Message
            || "An error occurred"
        );
        if (error.response?.status === 401) {
            console.warn("Unauthorized - token may be invalid or expired");
            logoutUser();
        }
        return Promise.reject(error);
    }
);



function logoutUser() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    localStorage.clear();
    window.location.href = "/auth";
}
