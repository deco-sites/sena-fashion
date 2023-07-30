import type { Dataset } from "$store/components/dashboard/widget/Timeseries.tsx";
import fetchData, {
  gql,
} from "$store/components/dashboard/queries/cloudflareAnalyticsQuery.ts";

// TODO: Why do we need to filter the zone?
const ZONE_TAG = "4d58f2b9ab1091d000cf777f815c51cb";
const DATE_WINDOW = 7;

const QUERY = gql`
query RequestsAndDataTransferByHostname($zoneTag: string, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject!) {
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      httpRequestsAdaptiveGroups(limit: 7, filter: $filter) {
        sum {
          visits
        }
        dimensions {
          date
        }
      }
    }
  }
}`;

interface Result {
  "viewer": {
    "zones": [
      {
        "httpRequestsAdaptiveGroups": [
          {
            "dimensions": {
              "date": string;
            };
            "sum": {
              "visits": number;
            };
          },
        ];
      },
    ];
  };
}

export default async function cloudflarePageVisitsLoader(): Promise<
  Dataset | null
> {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(end_date.getDate() - DATE_WINDOW);

  const variables = {
    "zoneTag": ZONE_TAG,
    "filter": {
      "requestSource": "eyeball",
      "edgeResponseContentTypeName": "html",
      "datetime_geq": start_date.toISOString(),
      "datetime_lt": end_date.toISOString(),
      "clientRequestHTTPHost": "www.zeedog.com.br",
    },
  };

  const data = await fetchData<Result, typeof QUERY, typeof variables>(
    QUERY,
    variables,
  );

  const zoneData = data?.viewer?.zones.find((zone) => zone != null);
  if (zoneData == null) {
    return null;
  }
  const groups = zoneData.httpRequestsAdaptiveGroups.sort((a, b) => {
    const da = new Date(a.dimensions.date);
    const db = new Date(b.dimensions.date);
    return da < db ? -1 : da > db ? 1 : 0;
  });

  const categories = groups.map(({ dimensions: { date } }) => date.toString());
  const visits = groups.map(({ sum: { visits } }) => visits);
  return { categories, series: [{ label: "Page visits", values: visits }] };
}
