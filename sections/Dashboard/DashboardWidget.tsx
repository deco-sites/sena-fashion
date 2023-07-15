import type { LoaderReturnType } from "$live/types.ts";

export interface Point {
  x: number | Date;
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

export default function DashboardWidget(
  { graphData: { name, series } }: Props,
) {
  return (
    <div>
      <h1>{name}</h1>
      {series.map(({ label, points }) => (
        <div>
          <h2>{label}</h2>
          <ul>
            {points.map(({ x, y }) => (
              <li>
                <b>{x}</b> {y}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
