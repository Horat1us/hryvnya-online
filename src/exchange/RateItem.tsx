import * as React from "react";
import { RateTrend } from "./Rate";
import { IconRateTrend } from "./IconRateTrend";
import "./RateItem.scss";
export type RateValueProps = {
    value: number;
} & ({ trend: RateTrend } | { previousValue?: number, });

export const RateItem: React.FC<RateValueProps> = (props) => {
    const trend = ("trend" in props) ? props.trend : RateTrend(props.value, props.previousValue);
    const value = props.value.toFixed(2);
    let className = `rate-item`;
    if (trend !== undefined) {
        className += ` ${className}__${trend}`;
    }
    return (
        <div className={className}>
            <IconRateTrend value={trend}/>
            {value}
        </div>
    );
};
