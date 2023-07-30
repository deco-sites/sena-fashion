import randomTimeseriesLoader from "$store/loaders/dashboard/randomTimeseriesLoader.ts";

const API_HOSTNAME = Deno.env.get("DECO_CX_API_HOSTNAME") || "https://deco.cx/";
const IS_MOCK_MODE = Deno.env.get("IS_MOCK_MODE");

function fetchMockData(queryPath: string): object | null {
  if (queryPath === "page-visits-1d-l7d") {
    return randomTimeseriesLoader({ minValue: 420, maxValue: 1337 });
  }
  if (queryPath === "most-popular-devices-l7d") {
    return {
      entries: [{
        deviceType: "desktop",
        browser: "Unkown",
        pageVisitsCount: Math.round(Math.random() * 420),
      }, {
        deviceType: "mobile",
        browser: "Unkown",
        pageVisitsCount: Math.round(Math.random() * 420),
      }, {
        deviceType: "mobile",
        browser: "ChromeMobile",
        pageVisitsCount: Math.round(Math.random() * 420),
      }, {
        deviceType: "mobile",
        browser: "GoogleBot",
        pageVisitsCount: Math.round(Math.random() * 420),
      }],
    };
  }
  if (queryPath === "most-popular-pages-l7d") {
    return {
      entries: [{
        path: "/",
        pageVisitsCount: Math.round(Math.random() * 739),
      }, {
        path: "/black-friday",
        pageVisitsCount: Math.round(Math.random() * 420),
      }, {
        path: "/products/cool-hat",
        pageVisitsCount: Math.round(Math.random() * 420),
      }],
    };
  }
  return null;
}

export default async function fetchData<TData>(
  siteName: string,
  queryPath: string,
): Promise<TData | null> {
  if (IS_MOCK_MODE) {
    return fetchMockData(queryPath) as TData;
  }

  const response = await fetch(
    new URL(`/api/${siteName}/analytics/${queryPath}`, API_HOSTNAME).toString(),
    {
      method: "GET",
      headers: [["Accept", "application/json"], [
        "Content-Type",
        "application/json",
      ]],
    },
  );
  console.log({ response });
  if (!response.ok) {
    console.error(await response.text());
    return null;
  }
  return (await response.json() as { data: TData }).data;
}
