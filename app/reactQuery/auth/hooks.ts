// app/reactQuery/auth/hooks.ts
import {useMutation, useQuery} from "@tanstack/react-query";
import {authServices, type NonceRequest, type NonceVerification, type NonceVerificationPureWallet} from "./services";

// 🔹 Get nonce for wallet address
export const useGetNonce = () =>
    useMutation({
        mutationKey: ["getNonce"],
        mutationFn: (data: NonceRequest) => authServices.getNonce(data),
    });

// 🔹 Get JWT token after signature
export const useGetToken = () =>
    useMutation({
        mutationKey: ["getToken"],
        mutationFn: (data: NonceVerification) => authServices.getToken(data),
    });

export const useLogout = () =>
    useMutation({
        mutationKey: ["logout"],
        mutationFn: () => authServices.logout(),
    });

export const useGetTokenWithPureWallet = () =>
    useMutation({
        mutationKey: ["getTokenWithPureWallet"],
        mutationFn: (data: NonceVerificationPureWallet) => authServices.getTokenWithPureWallet(data),
    });

// 🔹 Fetch user data
export const useGetUser = () =>
    useQuery({
        queryKey: ["getUser"],
        queryFn: () => authServices.getUser(),
    });
export const useGetUserStats = () =>
    useQuery({
        queryKey: ["getUserStats"],
        queryFn: () => authServices.getUserStats(),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        gcTime: 0,
        staleTime: 0
    });
