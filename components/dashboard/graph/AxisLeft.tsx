import { useMemo } from "preact/hooks";

type AxisLeftProps = {
  tickLength: number;
  yScale: d3.ScaleLinear<number, number>;
  pixelsPerTick: number;
};

export default function AxisLeft(
  { yScale, pixelsPerTick, tickLength }: AxisLeftProps,
) {
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
            x2={-tickLength}
            stroke="currentColor"
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "end",
              transform: `translate(-${tickLength * 2}px,3px)`,
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
}
