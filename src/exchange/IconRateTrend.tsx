import * as React from "react";
import { RateTrend } from "./Rate";
import arrow from "./icon-arrow.svg";

export const IconRateTrend: React.FC<{ value: RateTrend }> = ({ value }) => {
    if (value === undefined) {
        return null;
    }
    return <img src={arrow} alt={`${value} trend icon`} className={`icon-rate-trend icon-rate-trend__${value}`}/>;
};
