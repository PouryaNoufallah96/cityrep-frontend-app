import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    clientAuthServices,
    type GetVerificationCodeForAuthenticationRequest,
    type VerifyAndLoginWithVerificationCodeRequest,
    type ClientProfileDataUpdate,
    type ChangePhoneNumberRequest,
    type VerifyChangePhoneNumberRequest,
} from "./services";

export const useRequestVerificationCode = () =>
    useMutation({
        mutationKey: ["requestVerificationCode"],
        mutationFn: (data: GetVerificationCodeForAuthenticationRequest) =>
            clientAuthServices.requestVerificationCode(data),
    });

export const useVerifyAndLogin = () =>
    useMutation({
        mutationKey: ["verifyAndLogin"],
        mutationFn: (data: VerifyAndLoginWithVerificationCodeRequest) =>
            clientAuthServices.verifyAndLogin(data),

    });

export const useRenewToken = () =>
    useMutation({
        mutationKey: ["renewToken"],
        mutationFn: () => clientAuthServices.renewToken(),
    });

export const useGetClientData = (enabled = true) =>
    useQuery({
        queryKey: ["getClientData"],
        queryFn: () => clientAuthServices.getClientData(),
        enabled,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

export const useUpsertProfileData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["upsertProfileData"],
        mutationFn: (data: ClientProfileDataUpdate) =>
            clientAuthServices.upsertProfileData(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getClientData"] });
        },
    });
};

export const useRequestChangePhoneNumber = () =>
    useMutation({
        mutationKey: ["requestChangePhoneNumber"],
        mutationFn: (data: ChangePhoneNumberRequest) =>
            clientAuthServices.requestChangePhoneNumber(data),
    });

export const useVerifyChangePhoneNumber = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["verifyChangePhoneNumber"],
        mutationFn: (data: VerifyChangePhoneNumberRequest) =>
            clientAuthServices.verifyChangePhoneNumber(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["getClientData"] });
        },
    });
};


export const useGetOrCreateWallet = () =>
    useQuery({
        queryKey: ["wallet"],
        queryFn: () => clientAuthServices.getOrCreateWallet(),

        // چون wallet هویتیه
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
