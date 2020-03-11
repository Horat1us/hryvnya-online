import { RateHistoryItem } from "./Rate";

export const storageKeyPrefix = `rate.history.`;

export function storageKey(date: Date): string {
    return storageKeyPrefix + "." + date.toISOString().slice(0, 10);
}

export function get(date: Date): Array<RateHistoryItem> | undefined {
    const key = storageKey(date);
    const item = localStorage.getItem(key) || undefined;
    if (item === undefined) {
        return;
    }
    try {
        const history = JSON.parse(item);
        if (Array.isArray(history)) {
            return history.map(([currency, buy, sale]) => new RateHistoryItem(currency, buy, sale, date));
        }
    } catch (error) {
        console.warn(error);
    }
    return undefined;
}

export function set(date: Date, history: Array<RateHistoryItem>): void {
    const key = storageKey(date);
    const data = JSON.stringify(
        history.map(({ buy, sale, currency }) => [currency, buy, sale])
    );
    localStorage.setItem(key, data);
}
