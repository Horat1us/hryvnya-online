import * as React from "react";
import { RateHistoryItem } from "./Rate";

const ChartLineGroup: React.FC<{ items: Array<number>, min?: number, max?: number, interval: number, }> = (
    {
        items,
        interval,
        max = Math.max(...items)
    }
) => {
    const min = Math.min(...items);
    const delta = max - min;
    const marks = items.reverse().map((item, i) => [
        (i * interval * 2),
        (100 - (item - min + delta) / (max - min + delta + delta) * 100).toFixed(4)
    ]);
    marks.push([marks[ marks.length - 1 ][ 0 ], 100]);
    const points = "M 0 100 L " + marks.map((p) => p.join(" ")).join(" ") + " Z";

    return (
        <g className="history-chart__line">
            <path
                fill="url(#grid2)"
                d={points}
            />
            <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d={points.replace("M 0 100 L ", '').replace(/Z$/, '')}
            />
        </g>
    );
};


export const HistoryChart: React.FC<{
    items: Array<RateHistoryItem>,
    interval?: number,
} & React.SVGProps<SVGSVGElement>> = (
    {
        items,
        interval = 10,
        ...props
    }
) => {
    return (
        <svg {...props} className={`history-chart ${props.className || ""}`.trimEnd()} height="128px"
             viewBox={[-interval, -interval, interval * items.length * 2, 100 + interval].join(" ")}
             version="1.1" xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMaxYMid slice"
        >
            <defs>
                <linearGradient id="grid1" x1="0%" x2="50%" gradientTransform="rotate(90)" spreadMethod="reflect">
                    <stop offset="0" stopColor="white" stopOpacity="0"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0.29"/>
                </linearGradient>
                <radialGradient id="grid2" x1="30%" x2="70%"  cx = "50%" cy = "50%" r="65%" fy="15%" >
                    <stop offset="0" stopColor="white" stopOpacity=".8"/>
                    <stop offset="10%" stopColor="white" stopOpacity=".7"/>
                    <stop offset="30%" stopColor="white" stopOpacity=".5"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </radialGradient>
            </defs>
            <g className={"history-chart__grid"}>
                {items.map((item, key) => {
                    const x = key * interval * 2;
                    return <rect key={"grid" + item.currency + item.date} x={x} y={interval} width="1"
                                 fill="url(#grid1)"
                                 height={(100 - interval * 2)}/>;
                })}
            </g>
            <g className="history-chart__legend">
                {items.map((item, key) => {
                    const fontSize = interval - 1;
                    const x = key * interval * 2 - fontSize / 2;
                    return <text key={"legend" + item.currency + item.date} x={x} y={100} fill="white"
                                 fontSize={fontSize}>{item.date.slice(-2)}</text>;
                })}
            </g>
            <ChartLineGroup items={items.map((item) => item.buy)} min={0} interval={interval}/>
        </svg>

    )
};
