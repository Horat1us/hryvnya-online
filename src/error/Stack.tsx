import * as React from "react";

export const Stack: React.FC<{value: Error["stack"] | React.ErrorInfo["componentStack"]}> = ({value}) => {
    let code: string;
    try {
        code = ("string" === typeof value) ? value : JSON.stringify(value);
    } catch (error) {
        code = `Unable to serialize stack: ${error.message}`;
    }
    return <code>{code}</code>;
};
