import {axiosInstance} from "~/lib/axiosInstance";


type GuessStatuses = 'Pending' | 'Active' | 'Lose' | 'Win'

export interface GameList {

    "gameReference": string,
    "createMoment": string,
    "updateMoment": string,
    "tokenSymbol": string,
    "tokenName": string,
    "tokenAddress": string,
    "gameName": string,
    "description": string,
    "title": string,
    "targetValue": number,
    "startTime": string,
    "stopTime": string,
    "endTime": string,
    "state": string,
    "attachmentUrl": string,
    "prizeValue": number
}


export interface GameListResult {
    data: GameList[];
    pageCount: number;
    totalCount: number;
}

export type tokenSymbols = 'CAR' | 'INDUSTRIAL' | 'JEWELRY' | 'REALESTATE' | 'TRIP'

export interface Predictions {
    "updateMoment": string,
    "predictionReference": string,
    "gameReference": string,
    "gameName": string,
    "gameEndMoment": string,
    "gameStopMoment": string,
    "tokenSymbol": tokenSymbols,
    "tokenName": string,
    "predictionTokenAmount": number,
    "predictionTokenAmountInWei": string,
    "registerMoment": string,
    "state": GuessStatuses,
    "canEdit": boolean,
    "registerPayAmount": number,
    "registerPayAmountInWei": string
}

export interface getPredictionResult {
    data: Predictions[];
    pageCount: number;
    totalCount: number;
}

export interface GetGameList {
    "tokenAddress": string,
    "pagination": {
        "page": number,
        "size": number
    }
}

export interface GetPredictionList {
    "tokenFilters"?: string[],
    "stateFilter": GuessStatuses[],
    "pagination": {
        "page": number,
        "size": number
    }
}

export interface addPredictionPayload {
    "gameReference": string,
    "predictionsTokenAmount": number[]
}

export type addPredictionResponse = Predictions[]


export type GamesCategoriesResult = GamesCategory[]

export interface GamesCategory {
    "tokenName": string,
    "tokenSymbol": string,
    "tokenAddress": string,
    "activeGameCounts": number
}

export const gameServices = {

    getGamesCategories: async (): Promise<GamesCategoriesResult> => {
        const res = await axiosInstance.get(`/Game/GetGamesCategories`);
        return res.data.data;
    },

    getGameList: async (data: GetGameList): Promise<GameListResult> => {
        const res = await axiosInstance.post(`/Game/GetGameList`, data);
        return res.data.data;
    },
    getPredictionList: async (data: GetPredictionList): Promise<getPredictionResult> => {
        const res = await axiosInstance.post(`/Prediction/GetPredictionList`, data);
        return res.data.data;
    },

    addPrediction: async (data: addPredictionPayload): Promise<addPredictionResponse> => {
        const res = await axiosInstance.post(`/Prediction/AddPrediction`, data);
        return res.data.data;
    },
};
