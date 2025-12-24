import { useMutation, useQuery } from "@tanstack/react-query";
import {
    clientAuthServices,
    type GetVerificationCodeForAuthenticationRequest,
    type VerifyAndLoginWithVerificationCodeRequest,
    type ClientProfileDataUpdate,
    type ChangePhoneNumberRequest,
    type VerifyChangePhoneNumberRequest,
} from "./services";

/* =======================
   Auth hooks
======================= */

// 🔹 Request verification code
export const useRequestVerificationCode = () =>
    useMutation({
        mutationKey: ["requestVerificationCode"],
        mutationFn: (data: GetVerificationCodeForAuthenticationRequest) =>
            clientAuthServices.requestVerificationCode(data),
    });

// 🔹 Verify code & login
export const useVerifyAndLogin = () =>
    useMutation({
        mutationKey: ["verifyAndLogin"],
        mutationFn: (data: VerifyAndLoginWithVerificationCodeRequest) =>
            clientAuthServices.verifyAndLogin(data),

    });

// 🔹 Renew token
export const useRenewToken = () =>
    useMutation({
        mutationKey: ["renewToken"],
        mutationFn: () => clientAuthServices.renewToken(),
    });

/* =======================
   Profile hooks
======================= */

// 🔹 Get client profile
export const useGetClientData = () =>
    useQuery({
        queryKey: ["getClientData"],
        queryFn: () => clientAuthServices.getClientData(),
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

// 🔹 Upsert profile data
export const useUpsertProfileData = () =>
    useMutation({
        mutationKey: ["upsertProfileData"],
        mutationFn: (data: ClientProfileDataUpdate) =>
            clientAuthServices.upsertProfileData(data),
    });

// 🔹 Request phone change
export const useRequestChangePhoneNumber = () =>
    useMutation({
        mutationKey: ["requestChangePhoneNumber"],
        mutationFn: (data: ChangePhoneNumberRequest) =>
            clientAuthServices.requestChangePhoneNumber(data),
    });

// 🔹 Verify phone change
export const useVerifyChangePhoneNumber = () =>
    useMutation({
        mutationKey: ["verifyChangePhoneNumber"],
        mutationFn: (data: VerifyChangePhoneNumberRequest) =>
            clientAuthServices.verifyChangePhoneNumber(data),
    });
