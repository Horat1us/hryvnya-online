import * as React from "react";
import { Rate, RateType, RateTypes } from "./Rate";
import { IconRate } from "./IconRate";
import "./Article.scss";
import { RateItem } from "./RateItem";
import { HistoryChart } from "./HistoryChart";

const CurrentRateItem: React.FC<{ type: RateType, rate: Rate }> = ({ type, rate }) => {
    const value = rate.history[0][type];
    return <div className="exchange-article__rate" aria-label={type} aria-valuenow={value}>
        <IconRate type={type}/>
        <RateItem value={value}/>
    </div>
};

export const Article: React.FC<{ rate: Rate }> = ({ rate }) => {
    return (
        <article title={rate.currency} className="exchange-article">
            <h3 className="exchange-article__title">
                {rate.currency}
            </h3>
            {RateTypes.map((type) => <CurrentRateItem key={type} type={type} rate={rate}/>)}
            {rate.history.length > 1 && (
                <HistoryChart items={rate.history} className="exchange-article__chart" preserveAspectRatio="xMinYMid meet"/>
            )}
        </article>
    )
};
Article.displayName = "Exchange.Article";
