export type Rate = {
    currency: string;
} & {
    [k in RateType]: number;
}
export type RateTrend = "up" | "down" | undefined;
export const RateTrend: (current: number, prevous?: number) => RateTrend = (current, previous) => {
    if ((previous === undefined) || (previous === current)) {
        return undefined;
    }
    return (previous < current) ? "up" : "down";
};

export type RateType = "buy" | "sale";
export const RateTypes: Array<RateType> = ["buy", "sale"];
export type RateArray = Array<Rate>;
export type RateState = RateArray | Error | undefined;
export type GetRate = () => Promise<Array<Rate>>;
