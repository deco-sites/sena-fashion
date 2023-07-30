import type { LoaderReturnType } from "$live/types.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export interface Dataset {
  categories: string[];
  series: { values: number[]; label: string }[];
}

export interface Props {
  title: string;
  data: LoaderReturnType<Dataset | null>;
}

function Graph({ title, dataset }: { title: string; dataset: Dataset }) {
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
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
              title: {
                display: true,
                text: title,
                align: "center",
              },
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
  if (data == null) {
    return <p>No data for ${title}</p>;
  }
  return <Graph title={title} dataset={data} />;
}
