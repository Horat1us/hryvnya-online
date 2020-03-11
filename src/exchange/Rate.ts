export type RateType = "buy" | "sale";
export const RateTypes: Array<RateType> = ["buy", "sale"];

export class RateHistoryItem {
    public readonly buy: number;
    public readonly sale: number;
    public readonly date: string;

    constructor(
        public readonly  currency: string,
        buy: string | number,
        sale: string | number,
        date: Date
    ) {
        this.buy = parseFloat(buy as string);
        this.sale = parseFloat(sale as string);
        this.date = date.toISOString().slice(0, 10);
    }
}

export type Rate = {
    currency: string;
    history: [RateHistoryItem] & Array<RateHistoryItem>;
};
export type RateArray<R extends Rate = Rate> = Array<R>;
export type GetRate<R extends Rate = Rate> = () => Promise<RateArray<R>>;

export type RateTrend = "up" | "down" | undefined;
export const RateTrend: (current: number, prevous?: number) => RateTrend = (current, previous) => {
    if ((previous === undefined) || (previous === current)) {
        return undefined;
    }
    return (previous < current) ? "up" : "down";
};

