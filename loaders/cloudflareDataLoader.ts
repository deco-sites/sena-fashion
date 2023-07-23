import type {
  GraphData,
} from "deco-sites/sena-fashion/sections/Dashboard/DashboardWidget.tsx";
import { badRequest } from "$live/mod.ts";

const gql = (x: TemplateStringsArray) => x.toString().trim();

// TODO: Why do we need to filter the zone?
const ZONE_TAG = "4d58f2b9ab1091d000cf777f815c51cb";

const DATE_WINDOW = 7;
const DEFAULT_NAME = "Page visits according to Cloudflare.";
const ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const HEADERS: [string, string | undefined][] = [
  ["X-Auth-Key", Deno.env.get("CLOUDFLARE_API_KEY")],
  ["X-Auth-Email", Deno.env.get("CLOUDFLARE_API_EMAIL")],
  ["Accept", "application/json"],
  ["Content-Type", "application/json"],
];

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

const SUCCESS_CODE = 200;

type Data = {
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
};

export type Props = {
  name?: string;
};

function buildVariables(): Object {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(end_date.getDate() - DATE_WINDOW);
  return {
    "zoneTag": ZONE_TAG,
    "filter": {
      "requestSource": "eyeball",
      "edgeResponseContentTypeName": "html",
      "datetime_geq": end_date.toISOString(),
      "datetime_lt": start_date.toISOString(),
      "clientRequestHTTPHost": "www.zeedog.com.br",
    },
  };
}

function validateHeaders<T>(
  headers: [string, T][],
): [string, string][] {
  return headers.map(([key, value]) => [key, String(value)]);
}

// TODO : Add some intentional form of caching here, at least on dev.
async function fetchData(): Promise<Data | null> {
  const response = await fetch(
    ENDPOINT,
    {
      method: "POST",
      body: JSON.stringify({
        query: QUERY,
        variables: buildVariables(),
      }),
      headers: validateHeaders(HEADERS),
    },
  );
  if (response.status > SUCCESS_CODE) {
    console.error(await response.text());
    badRequest({ message: "Non 200 response from CF" });
    return null;
  }
  return (await response.json() as { data: Data }).data;
}

function parseData(
  data: Data,
) {
  const zoneData = data.viewer.zones.find((zone) => zone != null);
  if (zoneData == null) {
    return [];
  }
  const points = zoneData.httpRequestsAdaptiveGroups.map((data) => ({
    x: new Date(data.dimensions.date),
    y: data.sum.visits,
  })).sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
  return [
    {
      points,
      label: "Page views",
      x_unit: "Day",
      y_unit: "count",
    },
  ];
}

export default async function queryCFLoader(
  props: Props,
): Promise<GraphData> {
  const data = await fetchData();
  const name = props.name || DEFAULT_NAME;
  if (data == null) {
    return { name, series: [] };
  }
  return { name, series: parseData(data) };
}
