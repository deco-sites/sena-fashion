import type { LoaderReturnType } from "$live/types.ts";
import * as d3 from "https://cdn.skypack.dev/d3?dts";
import { useEffect, useMemo, useRef } from "preact/hooks";

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

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
const WIDTH = 600;
const HEIGHT = 300;

type AxisBottomProps = {
  xScale: d3.ScaleLinear<number, number>;
  numberOfTicksTarget: number;
  yOffset: number;
};

// tick length
const TICK_LENGTH = 6;

function AxisBottom(
  { xScale, numberOfTicksTarget, yOffset }: AxisBottomProps,
) {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const test = xScale.ticks(numberOfTicksTarget);
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <g transform={`translate(0,${yOffset})`}>
      {/* Main horizontal line */}
      <path
        d={["M", range[0], 0, "L", range[1], 0].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  );
}

type AxisLeftProps = {
  yScale: d3.ScaleLinear<number, number>;
  pixelsPerTick: number;
};

function AxisLeft({ yScale, pixelsPerTick }: AxisLeftProps) {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {/* Main vertical line */}
      <path
        d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
        fill="none"
        stroke="currentColor"
      />

      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0, ${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x2={-TICK_LENGTH}
            stroke="currentColor"
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
}

export default function DashboardWidget(
  { graphData: { name, series } }: Props,
) {
  const width = WIDTH;
  const height = HEIGHT;
  const data = series[0].points.map(({ x, y }, ind) => ({ y, x: ind }));

  // bounds = area inside the graph axis = calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  const [min, max] = d3.extent(data, (d) => d.y);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min || 0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  // X axis
  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Build the line
  const lineBuilder = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);
  if (!linePath) {
    return null;
  }

  return (
    <div>
      <h1>{name}</h1>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#9a6fb0"
            fill="none"
            strokeWidth={2}
          />
          <AxisBottom
            xScale={xScale}
            numberOfTicksTarget={data.length}
            yOffset={boundsHeight}
          />
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={30}
          />
        </g>
      </svg>
    </div>
  );
}
