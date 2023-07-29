import { Widget } from "$store/components/dashboard/base.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import TimeseriesGraph from "$store/components/dashboard/graph/TimeseriesGraph.tsx";

interface Point {
  x: Date;
  y: number;
}

interface Series {
  points: Point[];
}

export interface Data {
  series: Series[];
}

export interface Props {
  title: string;
  data: LoaderReturnType<Data | null>;
}

/**
 * @title Timeseries widget.
 */
export default function Timeseries({ title, data }: Props) {
  return (
    <Widget title={title}>
      {data == null ? "No data" : <TimeseriesGraph series={data.series} />}
    </Widget>
  );
}
