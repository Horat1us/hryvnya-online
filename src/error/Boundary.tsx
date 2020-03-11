import * as React from "react";
import { Layout } from "./Layout";

export class Boundary extends React.Component<{}, Error | {}> {
    public static readonly displayName = "Error.Boundary";
    public static readonly emptyState = Object.freeze({});

    public readonly state: Error | {} = Boundary.emptyState;

    static getDerivedStateFromError(error: Error) {
        return error;
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState(error);
        Object.assign(error, errorInfo);
    }

    render() {
        if (this.state !== Boundary.emptyState) {
            return <Layout error={this.state as Error}/>
        }

        return this.props.children;
    }
}
