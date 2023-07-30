import { Widget } from "$store/components/dashboard/base.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import TimeseriesGraph from "$store/components/dashboard/graph/TimeseriesGraph.tsx";

export interface Dataset {
  categories: string[];
  series: { values: number[]; label: string }[];
}

export interface Props {
  title: string;
  data: LoaderReturnType<Dataset | null>;
}

/**
 * @title Timeseries widget.
 */
export default function Timeseries({ title, data }: Props) {
  return (
    <Widget title={title}>
      {data == null ? "No data" : <TimeseriesGraph dataset={data} />}
    </Widget>
  );
}
