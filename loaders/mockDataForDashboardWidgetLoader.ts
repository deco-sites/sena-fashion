import type { GraphData } from "deco-sites/sena-fashion/sections/Dashboard/DashboardWidget.tsx";

export type SupportedSettings = "EMPTY" | "WEEKLY_TIMESERIES";
export interface Params {
  setting: SupportedSettings;
}

export default function loader({ setting }: Params): GraphData {
  switch (setting) {
    case "WEEKLY_TIMESERIES":
      return {
        name: "Conversions per day.",
        series: [
          {
            points: [
              1,
              4,
              10,
              7,
              8,
              6,
              3,
            ].map((y, ind) => {
              const date = new Date();
              return { x: date.setDate(date.getDate() - 7 + ind), y };
            }),
            x_unit: "day",
            y_unit: "conversions",
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
