import * as React from "react";
import { RateType } from "./Rate";

import buy from "./icon-buy.svg";
import sale from "./icon-sale.svg";
import "./IconRate.scss";

const getImageSource = (type: RateType) => {
    switch (type) {
        case "buy":
            return buy;
        case "sale":
            return sale;
    }
};

export const IconRate: React.FC<{ type: RateType }> = ({ type }) => {
    return <img
        className="icon-rate"
        src={getImageSource(type)}
        alt={type[ 0 ].toUpperCase() + type.slice(1) + " Rate"}
    />;
};
