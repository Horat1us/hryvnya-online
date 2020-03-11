import { GetRate } from "./Rate";

type ResponseItem = {
    ccy: string;
    buy: string;
    sale: string;
}

export const PrivatBank: GetRate = () => {
    return fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
        .then((response): Promise<Array<ResponseItem>> => response.json())
        .then((json) => json.map((item) => ({
            currency: item.ccy,
            buy: parseFloat(item.buy),
            sale: parseFloat(item.sale)
        })))
};
