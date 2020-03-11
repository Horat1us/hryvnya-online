import * as React from "react";
import "./Header.scss";
import { DateTime } from "./DateTime";

export const Header: React.FC<{}> = () => {
    return (
        <header className="shadow">
            <img src="./logo.svg" alt={"Гривна Онлайн"} className="logo"/>
            <h1 className="brand">
                гривна
                <span className="fw-lighter">.online</span>
            </h1>
            <h2 className="slogan">
                украинский дзен
            </h2>
            <DateTime />
        </header>
    );
};
