interface WPGraphQLParams {
  query: string;
  variables?: Record<string, any>;
}

export async function wpFetch<T>({
  query,
  variables = {},
}: WPGraphQLParams): Promise<T> {
  const WP_GRAPHQL_URL =
    import.meta.env.PUBLIC_WP_GRAPHQL_URL || "";

  if (!WP_GRAPHQL_URL) {
    throw new Error("Missing PUBLIC_WP_GRAPHQL_URL environment variable");
  }

  const headers = { "Content-Type": "application/json" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!res.ok) {
    throw new Error("Failed to fetch data from WordPress");
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error("GraphQL errors returned by WordPress API");
  }

  return json.data;
}
