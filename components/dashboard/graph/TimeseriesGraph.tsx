import { Data } from "$store/components/dashboard/widget/Timeseries.tsx";
import { useMemo } from "preact/hooks";
import * as d3 from "https://cdn.skypack.dev/d3?dts";
import AxisBottom from "$store/components/dashboard/graph/AxisBottom.tsx";
import AxisLeft from "$store/components/dashboard/graph/AxisLeft.tsx";

const TICK_LENGTH = 6;
const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };
const WIDTH = 600;
const HEIGHT = 300;

export default function TimeseriesGraph(
  { series }: Data,
) {
  const width = WIDTH;
  const height = HEIGHT;
  const data = series[0].points.map(({ x, y }, ind) => ({ y, x }));

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
      .scaleTime()
      .domain([xMin || 0, xMax || 0])
      .range([0, boundsWidth]).nice();
  }, [data, width]);

  // Build the line
  const lineBuilder = d3
    .line<{ x: Date; y: number }>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);
  if (!linePath) {
    return <p>No data or invalid data.</p>;
  }

  return (
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
          tickLength={TICK_LENGTH}
        />
        <AxisLeft
          yScale={yScale}
          pixelsPerTick={30}
          tickLength={TICK_LENGTH}
        />
      </g>
    </svg>
  );
}
