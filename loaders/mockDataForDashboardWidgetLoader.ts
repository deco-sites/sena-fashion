import type { GraphData } from "deco-sites/sena-fashion/sections/Dashboard/DashboardWidget.tsx";
import {
  map,
  reverse,
  splitEvery,
  sum,
  take,
} from "https://cdn.skypack.dev/ramda?dts";

export type SupportedSettings =
  | "EMPTY"
  | "DAILY_TIMESERIES_WEEK"
  | "PAGE_VISITS_MOCK"
  | "WEEKLY_TIMESERIES_MONTH";

export interface Params {
  setting: SupportedSettings;
}

function getDateDaysAgo(days: number) {
  const d = new Date();
  return new Date(d.setDate(d.getDate() - days));
}

function buildTimeseriesForWindow(length: number, jump_in_days: number) {
  return map(
    sum,
    take(
      length,
      splitEvery(jump_in_days, reverse(MOCK_CONVERSIONS_DATA_LAST_28_DAYS)),
    ),
  ).map((y, ind) => ({ y, x: getDateDaysAgo(ind * jump_in_days) }));
}

export default function loader({ setting }: Params): GraphData {
  switch (setting) {
    case "DAILY_TIMESERIES_WEEK":
      return {
        name: "Conversions per day.",
        series: [
          {
            points: buildTimeseriesForWindow(7, 1),
            x_unit: "day",
            y_unit: "conversions",
          },
        ],
      };
    case "WEEKLY_TIMESERIES_MONTH":
      return {
        name: "Conversions per week.",
        series: [
          {
            points: buildTimeseriesForWindow(4, 7),
            x_unit: "day",
            y_unit: "conversions",
          },
        ],
      };
    case "PAGE_VISITS_MOCK":
      return {
        name: "Page visits per day (mock).",
        series: [
          {
            points: [
              { x: new Date("2023-07-15"), y: 14680 },
              { x: new Date("2023-07-16"), y: 82960 },
              { x: new Date("2023-07-17"), y: 108480 },
              { x: new Date("2023-07-18"), y: 48040 },
              { x: new Date("2023-07-19"), y: 50600 },
              { x: new Date("2023-07-20"), y: 58520 },
              { x: new Date("2023-07-21"), y: 53720 },
            ],
          },
        ],
      };
    case "EMPTY":
      return {
        name: "No name.",
        series: [],
      };
  }
  return {
    name: "Unsupported Seeting",
    series: [],
  };
}

const MOCK_CONVERSIONS_DATA_LAST_28_DAYS = [
  1,
  3,
  2,
  4,
  8,
  10,
  7,
  10,
  13,
  11,
  15,
  21,
  30,
  35,
  28,
  33,
  40,
  37,
  33,
  37,
  41,
  43,
  42,
  40,
  47,
];
