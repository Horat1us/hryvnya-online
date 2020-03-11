import * as React from "react";
import * as Exchange from "./exchange";
import * as Error from "./error";
import { Loader } from "./Loader";

import "./Main.scss";

const getChildren = (exchange: Exchange.State) => {
    if (exchange === undefined) {
        return <Loader/>;
    }
    if (Array.isArray(exchange)) {
        return <Exchange.Layout rates={exchange}/>;
    }
    return <Error.Layout error={exchange}/>;
};

export const Main: React.FC<{ exchange: Exchange.State }> = ({ exchange }) => {
    return <main><Error.Boundary>{getChildren(exchange)}</Error.Boundary></main>
};
Main.displayName = "Main";

