import { RateHistoryItem } from "./Rate";
import * as RateHistoryCache from "./RateHistoryCache";

export async function getRateHistory(date: Date): Promise<Array<RateHistoryItem>> {
    let history = RateHistoryCache.get(date);
    if (history !== undefined) {
        return history;
    }

    const response = await fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=`
        + date.toISOString().slice(0, 10).split('-', 3).join('')
    ).then((response): Promise<Array<HistoryResponseItem>> => response.json());

    history = response.map(
        ({ cc, rate }) => new RateHistoryItem(
            cc, rate, rate, date
        )
    );
    RateHistoryCache.set(date, history);
    return history;
}

type HistoryResponseItem = {
    cc: string;
    rate: string;
    exchangedate: string;
}
