import * as React from "react";
import { Stack } from "./Stack";

export const Layout: React.FC<{ error: Error & Partial<React.ErrorInfo> }> = ({ error }) => {
    return (
        <details>
            <summary>Произошла ошибка. Кина не будет.</summary>
            <h3>{error.name}</h3>
            <p>{error.message}</p>
            <Stack value={error.stack}/>
            {("componentStack" in error) && <Stack value={error.componentStack}/>}
        </details>
    )
};
Layout.displayName = "Error.Layout";
