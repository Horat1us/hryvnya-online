import * as React from "react";
import * as Exchange from "./exchange";
import "./Background.scss";

export type BackgroundTheme = "ready" | "error" | "loading";
export const getBackgroundTheme = (state: Exchange.State): BackgroundTheme => {
    if (state === undefined) {
        return "loading";
    }
    if (Array.isArray(state)) {
        return "ready";
    }
    return "error";
};
export type BackgroundProps = {
    theme: BackgroundTheme;
} | {
    state: Exchange.State;
}

export const Background: React.FC<BackgroundProps> = (props) => {
    const theme = ("theme" in props) ? props.theme : getBackgroundTheme(props.state);
    return (
        <video autoPlay muted loop className={`background background_${theme}`}>
            <source src="./background.mp4" type="video/mp4"/>
        </video>
    );
};
