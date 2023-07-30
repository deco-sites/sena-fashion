import fetchData from "$store/components/dashboard/queries/decoAnalyticsQuery.ts";
import type { Dataset } from "$store/components/dashboard/widget/Table.tsx";
import site from "$store/site.json" assert { type: "json" };

const QUERY_PATH = "most-popular-devices-l7d";

interface Result {
  entries: {
    deviceType: string;
    browser: string;
    pageVisitsCount: number;
  }[];
}

export default async function decoMostPopularDevicesLoader(): Promise<
  Dataset | null
> {
  const data = await fetchData<Result>(
    site.siteId,
    QUERY_PATH,
  );

  if (data == null) {
    return null;
  }

  return {
    headers: ["Device Type", "Browser", "Page Visits (last 7 days)"],
    values: data.entries.map((
      { deviceType, browser, pageVisitsCount },
    ) => [deviceType, browser, String(pageVisitsCount)]),
  };
}
