const SUCCESS_CODE = 200;
const ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const HEADERS: [string, string | undefined][] = [
  ["X-Auth-Key", Deno.env.get("CLOUDFLARE_API_KEY")],
  ["X-Auth-Email", Deno.env.get("CLOUDFLARE_API_EMAIL")],
  ["Accept", "application/json"],
  ["Content-Type", "application/json"],
];

function validateHeaders<T>(
  headers: [string, T][],
): [string, string][] {
  return headers.map(([key, value]) => [key, String(value)]);
}

export function gql(x: TemplateStringsArray) {
  return x.toString().trim();
}

// TODO - Should we have caching to avoid too much querying?
export default async function fetchData<TData, TQuery, TVariables>(
  query: TQuery,
  variables: TVariables,
): Promise<TData | null> {
  const response = await fetch(
    ENDPOINT,
    {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: validateHeaders(HEADERS),
    },
  );
  if (response.status > SUCCESS_CODE) {
    console.error(await response.text());
    return null;
  }
  return (await response.json() as { data: TData }).data;
}
