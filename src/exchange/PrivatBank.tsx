import * as RateHistoryCache from "./RateHistoryCache";
import * as NationalBank from "./NationalBank";
import { GetRate, RateArray, RateHistoryItem } from "./Rate";

type ResponseItem = {
    ccy: string;
    buy: string;
    sale: string;
}

export const getRate: GetRate = async (length: Exclude<number, 0> = 30): Promise<RateArray> => {
    const today = new Date();
    const currencies: RateArray = await fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
        .then((response): Promise<Array<ResponseItem>> => response.json())
        .then((json): RateArray => json.map(({ ccy: currency, buy, sale }) => {
            if (currency === "RUR") {
                currency = "RUB";
            }
            return { currency, history: [new RateHistoryItem(currency, buy, sale, today)] };
        }));

    for (let i = 1; i < length; i++) {
        const date = new Date(today);
        date.setHours(today.getHours() - i * 24);

        const history = await NationalBank.getRateHistory(date);
        history
            .forEach((item) => {
                const rate = currencies.find((rate) => rate.currency === item.currency);
                if (rate !== undefined) {
                    rate.history[ i ] = item;
                }
            });
    }

    return currencies;
};

/**
 * PrivatBank disable CORS for rates history. :(
 */
export async function getRateHistory(date: Date): Promise<Array<RateHistoryItem>> {
    let history = RateHistoryCache.get(date);
    if (history !== undefined) {
        return history;
    }

    const response = await fetch(
        `https://api.privatbank.ua/p24api/exchange_rates?json&date=`
        + date.toISOString().slice(0, 10).split('-', 3).reverse().join('.')
    ).then((response): Promise<Array<HistoryResponseItem>> => response.json());

    return response.map(
        ({ currency, purchaseRate, saleRate }) => new RateHistoryItem(
            currency, purchaseRate, saleRate, date
        )
    );
}

type HistoryResponseItem = {
    currency: string;
    purchaseRate: string;
    saleRate: string;
}
