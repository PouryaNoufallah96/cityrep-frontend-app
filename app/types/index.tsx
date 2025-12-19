
export interface AssetItem {
    id: string;
    symbol: string;
    name: string;
    description: string;
    covered: number;
    availableForCover: number;
    logo: string;
}

export interface TokenContract {
    date: string; // e.g. "2026/02/01"
    contractExpirationDate: string; // e.g. "2026/04/01"
    symbol: string; // e.g. "MGC"
    name: string; // e.g. "Meta game coin"
    value: number; // e.g. 0.0
    currency: string; // e.g. "USD"
    quantity: number;
    months: number;
    plan: string;
    monthlyFee: number;
    return: number;
}

export interface TokenData {
    "price": {
        "tokenName": string,
        "tokenNetwork": string,
        "price": number
    },
    "lastUpdated": string
}
