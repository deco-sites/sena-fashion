import type { LoaderReturnType } from "$live/types.ts";
import * as d3 from "https://cdn.skypack.dev/d3?dts";
import {
  apply,
  flatten,
  map,
  max,
  min,
} from "https://cdn.skypack.dev/ramda?dts";

export interface Point {
  x: Date;
  y: number;
}

export interface Series {
  points: Array<Point>;
  label?: string;
  x_unit?: string;
  y_unit?: string;
}

export interface GraphData {
  name: string;
  series: Array<Series>;
}

export interface Props {
  graphData: LoaderReturnType<GraphData>;
}

const WIDTH = 300;

export default function DashboardWidget(
  { graphData: { name, series } }: Props,
) {
  const dates: Array<Date> = flatten(
    map((s) => s.points.map((point) => point.x), series),
  );
  const start: Date = dates.reduce((acc, curr) => min(acc, curr), new Date());
  const end: Date = dates.reduce((acc, curr) => max(acc, curr), new Date());

  const xScale = d3.scaleTime().domain([start, end]).range([0, WIDTH]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([WIDTH, 0]);
  const lineBuilder = d3.line()
    .x(([x, y]) => xScale(x))
    .y(([x, y]) => yScale(y));
  const linePaths = series.map(({ points }) =>
    lineBuilder(points.map(({ x, y }) => [x.getDate(), y]))
  ).filter(Boolean);

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <svg width={WIDTH} height={WIDTH}>
          <g
            width={WIDTH}
            height={WIDTH}
          >
            {linePaths.map((linePath) => {
              if (linePath == null) {
                return null;
              }
              return (
                <path
                  d={linePath}
                  stroke="#666"
                  fill="none"
                  strokeWidth={2}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
