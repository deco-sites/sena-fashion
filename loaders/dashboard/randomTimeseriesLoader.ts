import { Dataset } from "$store/components/dashboard/widget/Timeseries.tsx";

export interface Props {
  minValue: number;
  maxValue: number;
}

function getDateDaysAgo(days: number) {
  const d = new Date();
  return new Date(d.setDate(d.getDate() - days)).toDateString();
}

function getRandomSeries(getRandomValue: () => number) {
  const range = [6, 5, 4, 3, 2, 1, 0];
  return {
    categories: range.map(getDateDaysAgo),
    series: [{ values: range.map(getRandomValue), label: "Random values" }],
  };
}

/**
 * @title Random value for a Timeseries widget.
 */
export default function randomTimeseriesLoader(
  { minValue, maxValue }: Props,
): Dataset {
  return getRandomSeries(
    () =>
      Math.round(
        Math.random() * (maxValue - minValue) + minValue,
      ),
  );
}
