import fetchData from "$store/components/dashboard/queries/decoAnalyticsQuery.ts";
import type { Dataset } from "$store/components/dashboard/widget/Timeseries.tsx";

const QUERY_PATH = "page-visits-1d-l7d";

interface Result {
  date: string[];
  pageVisitsCount: number[];
}

export default async function decoPageVisitsLoader(): Promise<
  Dataset | null
> {
  const data = await fetchData<Result>(
    "camp",
    QUERY_PATH,
  );

  if (data == null) {
    return null;
  }

  return {
    categories: data.date,
    series: [{ values: data.pageVisitsCount, label: "Page Visits" }],
  };
}
