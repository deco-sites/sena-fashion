const API_HOSTNAME = Deno.env.get("DECO_CX_API_HOSTNAME") || "https://deco.cx/";

export default async function fetchData<TData>(
  siteName: string,
  queryPath: string,
): Promise<TData | null> {
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
