import * as React from "react";
import { RateArray } from "./Rate";
import { Article } from "./Article";

export const Layout: React.FC<{ rates: RateArray }> = ({ rates }) => {
    return <>{rates.map((rate) => <Article key={rate.currency} rate={rate}/>)}</>;
};
