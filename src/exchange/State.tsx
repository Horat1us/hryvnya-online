import * as React from "react";

import { PrivatBank } from "./PrivatBank";
import { RateArray } from "./Rate";

export type State = RateArray | Error | undefined;
export const useState = (): State => {
    const [state, setState] = React.useState<State>(undefined);
    React.useEffect(() => {
        if (state !== undefined) {
            return;
        }
        PrivatBank().then(setState, setState);
    }, [state]);
    return state;
};
