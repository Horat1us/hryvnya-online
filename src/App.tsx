import * as React from "react";
import './App.scss';

import * as Exchange from "./exchange";

import { Header } from "./Header";
import { Background } from "./Background";
import { Main } from "./Main";

export const App: React.FC<{}> = () => {
    const exchange = Exchange.useState();

    return (
        <div className="app">
            <Background state={exchange}/>
            <div className="container">
                <Header/>
                <Main exchange={exchange}/>
            </div>
        </div>
    );
};
