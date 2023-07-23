import { Data } from "$store/components/dashboard/widget/Timeseries.tsx";

export interface Props {
  minValue: number;
  maxValue: number;
}

function getDateDaysAgo(days: number) {
  const d = new Date();
  return new Date(d.setDate(d.getDate() - days));
}

function getRandomSeries(getRandomValue: () => number) {
  return {
    points: [6, 5, 4, 3, 2, 1, 0].map((daysAgo) => ({
      x: getDateDaysAgo(daysAgo),
      y: getRandomValue(),
    })),
  };
}

/**
 * @title Random value for a Timeseries widget.
 */
export default function counterMockLoader(
  { minValue, maxValue }: Props,
): Data {
  return {
    series: [getRandomSeries(() =>
      Math.round(
        Math.random() * (maxValue - minValue) + minValue,
      )
    )],
  };
}
