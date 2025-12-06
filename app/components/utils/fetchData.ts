const BASE_URL = "http://127.0.0.1:3001";

export interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export class HttpError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
  }
}

export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const config: RequestInit = {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  };

  if (body !== undefined && ["POST", "PUT", "PATCH"].includes(config.method!)) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorText = await response.text();
      const status = response.status;
      const statusText = response.statusText;

      console.error(`API Error ${status} for ${endpoint}:`, errorText);

      throw new HttpError(
        status,
        statusText,
        `Request failed with status ${status}: ${statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    return {} as T;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    console.error(`Error fetching data from ${endpoint}:`, error);
    throw new Error(
      `Failed to process request for ${endpoint}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
