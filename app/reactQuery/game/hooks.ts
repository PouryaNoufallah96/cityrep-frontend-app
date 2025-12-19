import {useMutation, useQuery} from "@tanstack/react-query";
import {type addPredictionPayload, gameServices, type GetGameList, type GetPredictionList} from "./services";
import {authServices, type NonceVerificationPureWallet} from "~/reactQuery/auth/services";


export const useGetGamesCategories = () =>
    useQuery({
        queryKey: ["getGamesCategories"],
        queryFn: () => gameServices.getGamesCategories(),
    });


export const useGetGameList = (data: GetGameList) =>
    useQuery({
        queryKey: ["getGameList", {ref: data.tokenAddress}],
        queryFn: () => gameServices.getGameList(data),
        enabled: !!data.tokenAddress
    });

export const useGetPredictionsList = (data: GetPredictionList) =>
    useQuery({
        queryKey: ["getPredictionList", {...data}],
        queryFn: () => gameServices.getPredictionList(data),
    });

export const useAddPrediction = () =>
    useMutation({
        mutationKey: ["addPrediction"],
        mutationFn: (data: addPredictionPayload) => gameServices.addPrediction(data),
    });