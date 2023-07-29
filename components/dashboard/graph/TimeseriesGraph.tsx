import { Data } from "$store/components/dashboard/widget/Timeseries.tsx";
import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Home({ series }: Data) {
  return (
    <>
      <Head>
        <title>Example Chart</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Chart
          type="line"
          data={{
            labels: series[0].points.map(({ x }) => x.toDateString()),
            datasets: series.map(({ points }) => ({
              label: "Visits",
              data: points.map(({ y }) => y),
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
