import type { Data } from "$store/components/dashboard/widget/Timeseries.tsx";
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

export default async function cloudflarePageVisitsLoader(): Promise<Data> {
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
    // TODO - The generic widget should know how to render errors.
    return { series: [] };
  }
  const points = zoneData.httpRequestsAdaptiveGroups.map((data) => ({
    x: new Date(data.dimensions.date),
    y: data.sum.visits,
  })).sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
  return { series: [{ points }] };
}
