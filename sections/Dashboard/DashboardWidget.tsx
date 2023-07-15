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
const WIDTH = 300;
const HEIGHT = 150;

export default function DashboardWidget(
  { graphData: { name, series } }: Props,
) {
  const width = WIDTH;
  const height = HEIGHT;
  const data = series[0].points.map(({ x, y }, ind) => ({ y, x: ind }));

  // bounds = area inside the graph axis = calculated by substracting the margins
  const axesRef = useRef(null);
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

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // Build the line
  const lineBuilder = d3
    .line<{ x: number; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);
  console.log({ linePath });
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
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
}
