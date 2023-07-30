import type { LoaderReturnType } from "$live/types.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import Widget from "$store/components/dashboard/widget/Widget.tsx";

export interface Dataset {
  categories: string[];
  series: { values: number[]; label: string }[];
}

export interface Props {
  title: string;
  data: LoaderReturnType<Dataset | null>;
}

function Graph({ dataset }: { dataset: Dataset }) {
  return (
    <>
      <div class="p-4 w-full">
        <Chart
          type="line"
          data={{
            labels: dataset.categories,
            datasets: dataset.series.map(({ values, label }) => ({
              label,
              data: values,
              borderColor: ChartColors.Red,
              backgroundColor: transparentize(ChartColors.Red, 0.5),
              borderWidth: 1,
            })),
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </>
  );
}

/**
 * @title Timeseries widget.
 */
export default function Timeseries({ title, data }: Props) {
  return (
    <Widget title={title} width="col-span-2">
      {data && <Graph dataset={data} />}
    </Widget>
  );
}
