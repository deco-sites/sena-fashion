import { useMemo } from "preact/hooks";

type AxisBottomProps = {
  tickLength: number;
  xScale: d3.ScaleTime<number, number>;
  numberOfTicksTarget: number;
  yOffset: number;
};

export default function AxisBottom(
  { xScale, numberOfTicksTarget, yOffset, tickLength }: AxisBottomProps,
) {
  const range = xScale.range();

  const ticks = useMemo(() => {
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
          <line y2={tickLength} stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {xScale.tickFormat(numberOfTicksTarget)(new Date(value))}
          </text>
        </g>
      ))}
    </g>
  );
}
