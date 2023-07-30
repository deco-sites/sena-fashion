import { Dataset } from "$store/components/dashboard/widget/Timeseries.tsx";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Home({ dataset }: { dataset: Dataset }) {
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
        />
      </div>
    </>
  );
}
