import * as React from "react";

import "./DateTime.scss";

type Format = () => string;
const dateFormat: Format = () => new Date().toLocaleDateString();
const timeFormat: Format = () => new Date().toTimeString().slice(0, 8);

export type ItemProps = React.HTMLProps<HTMLSpanElement> & { format: Format, interval?: number };
export const Item = React.forwardRef<HTMLSpanElement, ItemProps>(
    ({ format, interval = 1000, ...childProps }, ref) => {
        const [time, tick] = React.useReducer<Format, undefined>(format, undefined, format);
        React.useEffect(
            () => clearInterval.bind(window, setInterval(tick, interval) as any),
            [interval]
        );
        return <span {...childProps} className={`dt__item ${childProps.className}`.trimEnd()} ref={ref}>{time}</span>;
    }
);

export const DateTime = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    (props, ref) => {
        return (
            <div {...props} ref={ref} className={`dt ${props.className}`.trimEnd()}>
                <Item className="date" format={dateFormat} interval={60000}/>
                <Item className="time" format={timeFormat}/>
            </div>
        )
    }
);
